# eslint-config

## About

Strict ESLint config for [cpuabuse](https://github.com/cpuabuse).

Feel free to reuse any bits.

## Usage

### Installation

```pwsh
npm install --save-dev @cpuabuse/eslint-config
```

Peer dependencies must also be installed.

### Configuration

Create a file in the root of the project named `.eslintrc.yml` to extend default config, containing the following:
```yaml
extends: "@cpuabuse"
```

#### Additional configs

In case of using additional configs, ESLint does not support omitting `eslint-config` for scoped modules.
Following configs, are mutually exclusive, and default config conditionally extends them, based on path/extension.
Each config has a respective package entry point.

##### `typescript`

Used by default config for TypeScript files, `.eslintrc.yml` should contain the following:
```yaml
extends: "@cpuabuse/eslint-config/typescript"
```

##### `vue`

Rules for Vue, `.eslintrc.yml` should contain the following:
```yaml
extends: "@cpuabuse/eslint-config/vue"
```

##### `vue-tsx`

Rules for Vue TSX, `.eslintrc.yml` should contain the following:
```yaml
extends: "@cpuabuse/eslint-config/vue-tsx"
```

#### TSDoc

This package provides `tsdoc.json` to extend via `tsdoc` entry point.

Notes:
- In `package.json` this package is using `typesVersions` for types instead of `exports`, since for it to work, `moduleResolution` must be `Node16` in consuming package.
- Module resolution of TSDoc's `extends` within `tsdoc.json` does not seem to pick up `exports` of `package.json`, so configuration should be extended with "absolute" file path relative to the module: `"extends": ["@cpuabuse/eslint-config/dist/tsdoc/tsdoc.json"]`.

## Development

Top level configs go into `src` folder, while anything else must reside inside `src/lib` (`.gitignore` ignores `/lib` folder for release).

### Build types

#### `release`

Config files are put into the package root, so that ESLint can consume additional configs, as it resolves their path relative to root, not the entrypoint.

#### `test`

Validates exported config structure with Mocha.
