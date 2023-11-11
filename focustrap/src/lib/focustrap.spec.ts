import { UserEvent, userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { FocusTrap } from './focustrap';

describe('FocusTrap', () => {
  let user: UserEvent;
  let focusTrap: FocusTrap;
  let container: HTMLElement;

  describe('Initial state, trap on and trap off', () => {
    beforeEach(() => {
      document.body.innerHTML = `
    <div>
      <a href="https://www.test.com" data-testid="before-1">Outside trap</a>
      <div data-testid="focus-trap-container">
        <a href="https://www.test.com" data-testid="focus-trap-1">Focus 1</a>
        <a href="https://www.test.com" data-testid="focus-trap-2">Focus 2</a>
        <a href="https://www.test.com" data-testid="focus-trap-3">Focus 3</a>
      </div>
      <a href="https://www.test.com" data-testid="after-1">Outside trap</a>
    </div>
    `;
      user = userEvent.setup();
      screen.getByTestId('before-1').focus();
      container = document.querySelector(
        '[data-testid="focus-trap-container"]'
      )!;
    });

    it('should initially focus on the first element', () => {
      expect(screen.getByTestId('before-1')).toHaveFocus();
    });

    it('should focus on the first element of the focus trap when the focus trap is set', async () => {
      focusTrap = new FocusTrap(container);
      expect(screen.getByTestId('focus-trap-1')).toHaveFocus();
    });

    it('should focus tabbable elements inside the focus trap when tabbing forward', async () => {
      focusTrap = new FocusTrap(container);
      await user.tab();
      expect(screen.getByTestId('focus-trap-2')).toHaveFocus();
      await user.tab();
      expect(screen.getByTestId('focus-trap-3')).toHaveFocus();
      await user.tab();
      expect(screen.getByTestId('focus-trap-1')).toHaveFocus();
    });

    it('should focus tabbable elements inside the focus trap when tabbing backwards', async () => {
      focusTrap = new FocusTrap(container);
      await user.tab({ shift: true });
      expect(screen.getByTestId('focus-trap-3')).toHaveFocus();
      await user.tab({ shift: true });
      expect(screen.getByTestId('focus-trap-2')).toHaveFocus();
      await user.tab({ shift: true });
      expect(screen.getByTestId('focus-trap-1')).toHaveFocus();
    });

    it('should unset the focus trap', async () => {
      focusTrap = new FocusTrap(container);
      await user.tab();
      expect(screen.getByTestId('focus-trap-2')).toHaveFocus();
      focusTrap.off();
      await user.tab();
      expect(screen.getByTestId('focus-trap-3')).toHaveFocus();
      await user.tab();
      expect(screen.getByTestId('after-1')).toHaveFocus();
    });
  });
});
