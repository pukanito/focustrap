# Focustrap

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

Reference: https://nx.dev/nx-api/js

Packages for implementing a focus trap in JavaScript.

## Focusable

Finds keyboard-focusable elements within a specified element’s subtree.

- build: `npm run nx -- build focusable` (from the root project directory)
- test: `npm run nx -- test focusable` (from the root project directory)
- publishing:

### Testing

The `test-focusable` application is used for testing the build `focusable` library. 
Run: `npm run nx -- serve test-focusable` to build and start the application. If
everything goes well there will be some green in the browser.

## FocusTrap

Trap keyboard focus inside an element.

## Notes

### Recreate the basic workspace:

- create a new workspace for the focustrap: `npx create-nx-workspace focustrap --preset=ts`
- add `nx` script to main `package.json`: `"nx": "nx"`
- create the `focusable` library: `npm run nx -- g @nx/js:lib focusable`
- create the `test-focusable` application: `npm run nx -- g @nx/angular:application test-focusable`
- create the `focusable` library: `npm run nx -- g @nx/js:lib focustrap`

### gpg signing in wsl windows 11 (password popup in windows)

- https://stackoverflow.com/a/68689405 (see first comments for an alternative path)
