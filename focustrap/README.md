# focustrap

This library was generated with [Nx](https://nx.dev).

Keeps focus trapped inside a HTMLElement when navigating with the keyboard.

## Usage

```typescript
import { FocusTrap } from './focustrap';
const container = document.querySelector('...')!;
const focusTrap = new FocusTrap(container);
/* Focus trapped inside the container */
focusTrap.off()
/* Focus no longer trapped */
```

## Building

Run `npm run nx -- build focustrap` from the root project directory to build the library.

## Running unit tests

Run `npm run nx -- test focustrap` from the root project directory to execute the unit tests via [Jest](https://jestjs.io).

## NX default changes

### jest.config.ts

- added `modulePaths` and `moduleNameMapper` to find the focusable library.
  `prefix` is set to `<rootDir>/../` because the `dist` directory in the mappings
  is one level higher than the root of the `focustrap` library.

```typescript
/* eslint-disable */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.base.json');

export default {
  // default config
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
};
```

### tsconfig.spec.json

- added `jest-setup.ts` to the `include`'s so that `@testing-library/jest-dom`
  matchers are recognized by Intellij.

```json
{
  "...": "default settings",
  "include": [
    "...",
    "jest-setup.ts"
  ]
}

```
