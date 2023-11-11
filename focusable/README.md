# focusable

This library was generated with [Nx](https://nx.dev).

Finds keyboard-focusable elements within a specified element’s subtree.

## Usage

Import the module and run it.
```typescript
import Focusable from '@pukanito/focusable'
const focus = new Focusable(element)
focus.focusables // Array of focusable elements
```
- `element`: The element, which subtree to search for focusable elements. Defaults to `document`.

### Properties

FocusTrap has the following properties:
1. `focusables` - Array of keyboard focusable elements
4. `firstFocusable` - First keyboard focusable element
5. `lastFocusable` - Last keyboard focusable element

FocusTrap has the following methods:
1. `isFirstFocusable(el)` - Returns true if the element is the first focusable.
2. `isLastFocusable(el)` - Returns true if the element is the last focusable.

## Building

Run `nx build focusable` to build the library.

## Running unit tests

Run `nx test focusable` to execute the unit tests via [Jest](https://jestjs.io).
