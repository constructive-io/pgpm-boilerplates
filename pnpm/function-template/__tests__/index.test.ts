
import { getConnections, PgTestClient } from 'pgsql-test';
import { KubernetesClient } from 'kubernetesjs';
import * as fs from 'fs';

describe('____functionName____ Function (Integration)', () => {
    let db: PgTestClient;
    let pg: PgTestClient;
    let teardown: () => Promise<void>;
    let k8s: KubernetesClient;
    let k8sOpts: any;

    const NAMESPACE = 'default';

    let proxyProcess: any;

    beforeAll(async () => {
        // Start kubectl proxy in background to handle auth
        const { spawn } = require('child_process');
        proxyProcess = spawn('kubectl', ['proxy', '--port=8001']);

        // Wait for proxy to be ready
        await new Promise(resolve => setTimeout(resolve, 2000));

        // database connection in the pod
        ({ pg, db, teardown } = await getConnections({
            pg: {
                user: 'postgres',
                password: process.env.PGPASSWORD,
                host: process.env.PGHOST,
                port: Number(process.env.PGPORT || 5432),
                database: String(process.env.PGDATABASE || `____functionName_____test_${Math.floor(Math.random() * 100000)}`)
            },
            db: {
                connections: { app: { user: 'postgres', password: process.env.PGPASSWORD } }
            }
        }));

        // Connect to local proxy
        k8s = new KubernetesClient({
            restEndpoint: 'http://127.0.0.1:8001'
        } as any);
        k8sOpts = {};
    });

    afterAll(async () => {
        await teardown();
        if (proxyProcess) proxyProcess.kill();
    });

    it('should orchestrate the ____functionName____ job and verify completion', async () => {
        const jobName = `____functionName____-exec-${Math.floor(Date.now() / 1000)}`;
        console.log(`[Test] Orchestrating Job: ${jobName}`);

        // 1. Clean up potential leftovers
        try {
            await k8s.deleteBatchV1NamespacedJob({
                path: { namespace: NAMESPACE, name: jobName },
                query: { propagationPolicy: 'Background' }
            });
        } catch (e) { }

        // 2. Create the Job
        const jobManifest = {
            apiVersion: 'batch/v1',
            kind: 'Job',
            metadata: {
                name: jobName,
                namespace: NAMESPACE,
                labels: { "job-name": jobName, "app": "____functionName____" }
            },
            spec: {
                backoffLimit: 0,
                template: {
                    metadata: { labels: { "job-name": jobName } },
                    spec: {
                        restartPolicy: 'Never',
                        containers: [{
                            name: '____functionName____',
                            image: 'constructive/function-test-runner:v2',
                            imagePullPolicy: "IfNotPresent",
                            command: ["npx", "ts-node", "functions/_runtimes/node/runner.js", "functions/____functionName____/src/index.ts"],
                            env: [
                                { name: "PGHOST", value: "postgres" },
                                { name: "PGPASSWORD", value: process.env.PGPASSWORD }
                            ]
                        }]
                    }
                }
            }
        };

        // Apply via k8s client
        await k8s.createBatchV1NamespacedJob({
            path: { namespace: NAMESPACE },
            body: jobManifest,
            query: {}
        });

        // 3. Wait for Pod Running & Logs
        console.log(`[Test] Waiting for pod for job ${jobName} to be Running...`);
        let logsResponse = '';
        let podName = '';
        let success = false;

        // Poll for Pod and check status/logs
        for (let i = 0; i < 30; i++) {
            try {
                if (!podName) {
                    const pods = await k8s.listCoreV1NamespacedPod({
                        path: { namespace: NAMESPACE },
                        query: { labelSelector: `job-name=${jobName}` }
                    });
                    if (pods.items && pods.items.length > 0) {
                        podName = pods.items[0].metadata.name;
                        console.log(`[Test] Found Pod: ${podName}`);
                    }
                }

                if (podName) {
                    try {
                        // Use raw fetch via proxy because kubernetesjs might fail to parse text logs
                        const res = await fetch(`http://127.0.0.1:8001/api/v1/namespaces/${NAMESPACE}/pods/${podName}/log?tailLines=50`);
                        const logs = await res.text();

                        if (logs.includes('listening on port')) {
                            console.log(`[Test] Service is listening! Success.`);
                            logsResponse = logs;
                            success = true;
                            break;
                        }
                        if (logs) logsResponse = logs;
                    } catch (logErr) {
                        console.warn('Log fetch error:', logErr);
                    }
                }
            } catch (e) {
                // Ignore transient errors
            }
            await new Promise(r => setTimeout(r, 2000));
        }

        if (!success) {
            throw new Error(`Service failed to start or log listening. Logs: ${logsResponse}`);
        }

        expect(success).toBe(true);
        expect(logsResponse).toContain('listening on port');

        // Cleanup
        try {
            await k8s.deleteBatchV1NamespacedJob({
                path: { namespace: NAMESPACE, name: jobName },
                query: { propagationPolicy: 'Background' }
            });
        } catch (e) { }
    }, 120000);

    it('should verify database connectivity via pgsql-test', async () => {
        const result = await pg.query('SELECT 1 as num');
        expect(result.rows[0].num).toBe(1);
    });
});
