# pgpm-boilerplates

Boilerplate templates for [pgpm](https://www.npmjs.com/package/@pgpmjs/cli), the PostgreSQL Package Manager. These templates are used by `pgpm init` to scaffold new workspaces and modules.

## Usage

```bash
# Create a new workspace
pgpm init workspace

# Create a new module (inside a workspace)
pgpm init
```

The templates are fetched from this repository and cached locally under `~/.pgpm/cache/repos`. Use `pgpm cache clean` to clear the cache if you need a fresh pull.

## Structure

```
default/
├── module/      # Single package/module template
└── workspace/   # Monorepo workspace template
```

## Placeholders

Templates use the `____placeholder____` pattern (4 underscores on each side) for variable substitution. These are replaced by [genomic](https://www.npmjs.com/package/genomic) during project generation.

## Scripts

### Find Placeholders

Scan templates for placeholder variables:

```bash
# Install dependencies
pnpm install

# Search entire repo
pnpm run find-placeholders

# Search specific directory
pnpm run find-placeholders -- ./default/module
```

This outputs all placeholders found, grouped by directory, with file locations and context.
