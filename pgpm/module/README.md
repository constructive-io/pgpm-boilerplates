# ____moduleName____

<p align="center" width="100%">
  <img height="250" src="https://raw.githubusercontent.com/constructive-io/constructive/refs/heads/main/assets/outline-logo.svg" />
</p>

<p align="center" width="100%">
  <a href="https://github.com/____username____/____repoName____/actions/workflows/ci.yml">
    <img height="20" src="https://github.com/____username____/____repoName____/actions/workflows/ci.yml/badge.svg" />
  </a>
   <a href="https://www.npmjs.com/package/____moduleName____"><img height="20" src="https://img.shields.io/github/package-json/v/____username____/____repoName____?filename=packages%2F____moduleName____%2Fpackage.json"/></a>
</p>

## Developing

This module was generated with `pgpm init`. For a complete guide on creating and testing database modules, see [Creating Your First Module](https://constructive.io/learn/modular-postgres/creating-first-module).

```sh
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Deploy to a database
pgpm deploy --database your_db --createdb --yes
```

## Auditing

[safegres](https://www.npmjs.com/package/safegres) grades this module's schema on
two independent axes — security (grants, RLS, policy coverage and behavior) and
performance (predicates no index can serve, per-row function calls, foreign keys
without a covering index):

```sh
# Audit: deploys this module into an ephemeral database and scans its catalog
pnpm run audit:db

# Accept today's performance findings as debt, so CI gates only on new ones
pnpm run audit:db:baseline

# Audit a database you already have instead
pnpm exec safegres audit --database your_db
```

The gates and the exposed surface to grade against live in `safegres.config.js`;
the run also writes JSON, markdown and SARIF reports to `safegres-reports/`.

## Credits

**🛠 Built by the [Constructive](https://constructive.io) team — creators of modular Postgres tooling for secure, composable backends. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
