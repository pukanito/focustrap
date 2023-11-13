# focustrap

This library was generated with [Nx](https://nx.dev).

Keeps focus trapped inside a HTMLElement when navigating with the keyboard.

## Usage
In `package.json` add a dependency to 'focustrap' and 'focusable':

```json
{
  "dependencies": {
    "@pukanito/focustrap": "0.0.4",
    "@pukanito/focusable": "0.0.2"
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

### Properties

`FocusTrap` has the following properties:
1. `focusable` - access the underlying `Focusable`.

`FocusTrap` has the following methods:
1. `uninstall()` - uninstalls the focus trap.
