
IMAGE_NAME ?= constructive/____functionName____-test:v1
KIND_CLUSTER_NAME ?= interweb-local
KIND_BIN ?= $(shell which kind 2>/dev/null || echo "/opt/homebrew/bin/kind")

# Define Secrets and Env
TEST_PGHOST ?= postgres
TEST_PGPASSWORD ?= $(shell kubectl get secret --namespace default pg-credentials -o jsonpath="{.data.PGPASSWORD}" | base64 --decode)

.PHONY: vendor test clean test-k8s

test:
	pnpm test

clean:
	pnpm clean

# Test in K8s (In-Cluster)
test-k8s:
	@echo "Running Generic Test Pattern for ____functionName____..."
	kubectl proxy --port=8001 > proxy.log 2>&1 & PID=$$!; \
	echo "Starting Proxy (PID: $$PID)..."; \
	sleep 2; \
	TEST_PGPASSWORD=$$(kubectl get secret pg-credentials -o jsonpath="{.data.PGPASSWORD}" | base64 --decode) \
	IMAGE_NAME="constructive/function-test-runner:v1" \
	IS_IN_POD="false" \
	PGHOST=$(TEST_PGHOST) \
	PGUSER=postgres \
	PGPASSWORD=$$TEST_PGPASSWORD \
	TEST_GRAPHQL_URL=$(TEST_GRAPHQL_URL) \
	npm test -- __tests__/index.test.ts || (echo "=== Proxy Logs ===" && cat proxy.log && kill $$PID && exit 1); \
	kill $$PID; \
	rm proxy.log
