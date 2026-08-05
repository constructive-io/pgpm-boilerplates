# ____repoName____

<p align="center" width="100%">
  <img height="250" src="https://raw.githubusercontent.com/constructive-io/constructive/refs/heads/main/assets/outline-logo.svg" />
</p>

<p align="center" width="100%">
  <a href="https://github.com/____username____/____repoName____/actions/workflows/ci.yml">
    <img height="20" src="https://github.com/____username____/____repoName____/actions/workflows/ci.yml/badge.svg" />
  </a>
</p>


## Getting Started

This is a pnpm workspace for organizing modular packages.

### Quick Start

```sh
# Install dependencies
pnpm install

# Run tests across all packages
pnpm test

# Build all packages
pnpm build

# Lint all packages
pnpm lint
```

### Supply-chain defaults

`pnpm-workspace.yaml` makes two settings explicit, and both are worth keeping: a release must be 14 days old before pnpm will install it, and no dependency may run an install script. Most registry attacks are caught within days of publication, so the wait means your install never sees them.

Nothing is locked yet on the very first install, so it resolves every version from the registry and fails if any of them is newer than the wait. Get past it once, then commit the lockfile — from then on installs replay the lockfile and the wait only applies to versions you are adding:

```sh
pnpm install --config.minimumReleaseAge=0
```

If you publish to npm yourself, waiting on your own releases protects nothing; [pnpm-policy](https://www.npmjs.com/package/pnpm-policy) generates these settings with your own packages exempted.

### Prerequisites

- Node.js 20+
- pnpm

## Credits

**Built by the [Constructive](https://constructive.io) team. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
