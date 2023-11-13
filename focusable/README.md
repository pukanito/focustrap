# focusable

This library was generated with [Nx](https://nx.dev).

Finds keyboard-focusable elements within a specified element’s subtree.

## Usage

In `package.json` add a dependency to 'focusable':

```json
{
  "dependencies": {
    "@pukanito/focusable": "0.0.2"
  }
}
```

Use `Focusable`:

```typescript
import Focusable from '@pukanito/focusable'
const focus = new Focusable(element)
focus.focusables // Array of focusable elements
```
- `element`: The element, which subtree to search for focusable elements. Defaults to `document.documentElement`.

### Properties

`Focusable` has the following properties:
1. `focusables` - Array of keyboard focusable elements
4. `firstFocusable` - First keyboard focusable element
5. `lastFocusable` - Last keyboard focusable element

`Focusable` has the following methods:
1. `isFirstFocusable(el)` - Returns true if the element is the first focusable.
2. `isLastFocusable(el)` - Returns true if the element is the last focusable.
