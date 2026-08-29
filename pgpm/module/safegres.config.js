/**
 * Database audit — https://www.npmjs.com/package/safegres
 *
 * safegres reads the catalog of a live database and scores it on two
 * independent axes: security (grants, RLS, policy coverage, policy behavior)
 * and performance (policy predicates no index can serve, per-row function
 * calls, foreign keys without a covering index). Nothing is executed against
 * your data and nothing is written.
 *
 *   pnpm run audit:db            # audit + gates
 *   pnpm run audit:db:baseline   # accept today's perf findings as debt
 *
 * `source.pgpm` below means the audit needs no database of its own: this
 * module is deployed into an ephemeral one (pgsql-test) and that is what gets
 * audited, so the same command works locally and in CI. Point it at a real
 * database instead by naming a connection, which always wins over the config:
 *
 *   pnpm exec safegres audit --database my_db
 */
module.exports = {
  extends: 'safegres:recommended',

  source: { pgpm: '.' },

  // The pgpm ledger is the package manager's own bookkeeping — it lands in
  // every database beside your module and is nobody's API. Audit your schema.
  excludeSchemas: ['pgpm_migrate'],

  // What your API actually exposes. Findings outside the exposed surface are
  // reported as internal advisories rather than scored — and with no surface
  // declared safegres has to assume the whole database is reachable, which it
  // warns about (W1) and caps the score for. Declare the schemas your API
  // serves and the roles it connects as:
  //
  // exposure: {
  //   schemas: ['app_public'],
  //   roles: ['authenticated'],
  //   // The subset of `roles` an unauthenticated caller arrives as. Setting it
  //   // is what switches on the untrusted-role rules (R1, R2, L5).
  //   anonRoles: ['anonymous']
  // },

  // Security is gated on a grade; performance is gated on a ratchet. A perf
  // score is dominated by whatever debt a schema already carries, so a
  // threshold on it either fails forever or means nothing — commit today's
  // findings as accepted debt and fail only on findings that are NOT in the
  // baseline. `audit:db:baseline` (re)writes it; commit the result.
  perf: {
    enabled: true,
    baseline: 'safegres-perf-baseline.json',
    failOnNew: true
  },

  // safegres.json / safegres.md / safegres.sarif, re-derived on every run —
  // git-ignored, never committed. The baseline above is the only file with state.
  outputs: { dir: 'safegres-reports' },

  failOn: { grade: 'B' }
};
