# focustrap

This library was generated with [Nx](https://nx.dev).

Keeps focus trapped inside a HTMLElement when navigating with the keyboard.

Available on [npmjs.com](https://www.npmjs.com/package/@pukanito/focustrap).

## Usage
In `package.json` add a dependency to 'focustrap' and 'focusable':

```json
{
  "dependencies": {
    "@pukanito/focustrap": "1.0.0",
    "@pukanito/focusable": "1.0.0"
  }
}
```

Use `FocusTrap`:

```typescript
import { FocusTrap } from '@pukanito/focustrap';
const container = document.querySelector('...')!;
const focusTrap = new FocusTrap(container);
/* Focus trapped inside the container */
focusTrap.uninstall()
/* Focus no longer trapped */
```
- `container`: The element where to trap focus.

### Properties

`FocusTrap` has the following properties:
1. `focusable` - access the underlying `Focusable`.

`FocusTrap` has the following methods:
1. `uninstall()` - uninstalls the focus trap.
