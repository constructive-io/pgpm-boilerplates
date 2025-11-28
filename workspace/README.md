# ____moduleName____

<p align="center">
  <img src="https://raw.githubusercontent.com/launchql/launchql/refs/heads/main/assets/outline-logo.svg" width="250"><br />
    ____moduleDesc____
</p>

## Getting Started

This workspace was generated with `pgpm init --workspace`. For a complete guide on developing with pgpm workspaces, see [Workspaces: Organize Postgres](https://launchql.com/learn/modular-postgres/workspaces-organize-postgres).

### Quick Start

```sh
# Install dependencies
pnpm install

# Start PostgreSQL (requires Docker)
pgpm docker start

# Load environment variables
eval "$(pgpm env)"

# Create a module
pgpm init

# Navigate to your module and run tests
cd packages/your-module
pnpm test:watch
```

### Prerequisites

- Node.js 20+
- pnpm
- Docker
- PostgreSQL client tools (`psql`)
- pgpm (`npm install -g pgpm`)

See [Prerequisites](https://launchql.com/learn/quickstart/prerequisites) for detailed setup instructions.

## Credits

🛠 Built by LaunchQL — checkout [our github ⚛️](https://github.com/launchql)


## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
