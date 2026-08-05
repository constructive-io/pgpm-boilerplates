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

### Supply-chain policy

A third-party release must be 14 days old before this workspace will install it, which is where most compromised releases are caught. Packages in `@____username____` are exempt, and `pnpm-policy.yaml` is where you widen that, approve an install script, or waive the wait for an urgent security release:

```sh
pnpm run policy        # regenerate the managed block in pnpm-workspace.yaml
pnpm run policy:check  # CI: fail on drift or an expired waiver
```

See [pnpm-policy](https://www.npmjs.com/package/pnpm-policy) for the full configuration.

Nothing is locked yet on the very first install, so it resolves every version from the registry and trips if any of them is newer than the wait. Get past it once, then commit the lockfile it produces — from then on installs replay the lockfile and the wait only applies to versions you are adding:

```sh
pnpm install --config.minimumReleaseAge=0
```

### Prerequisites

- Node.js 20+
- pnpm

## Credits

**Built by the [Constructive](https://constructive.io) team. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
