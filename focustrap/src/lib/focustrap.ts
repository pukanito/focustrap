import { Focusable, FocusableConfig } from '@pukanito/focusable';

export { FocusTrap };

/**
 * Traps/un-traps focus inside the given element.
 */
class FocusTrap {
  /**
   * Access to underlying Focusable.
   */
  focusable: Focusable;

  // Returns true if the event is a Tab.
  private static isTab = (event: KeyboardEvent) =>
    !event.shiftKey && event.key === 'Tab';

  // Returns true if the event is a Shift-Tab.
  private static isShiftTab = (event: KeyboardEvent) =>
    event.shiftKey && event.key === 'Tab';

  // Handle Tab/Shift-Tab keyboard events.
  private handleFocus = (event: KeyboardEvent) => {
    if (FocusTrap.isTab(event)) {
      if (
        event.target instanceof HTMLElement &&
        this.focusable.isLastFocusable(event.target)
      ) {
        this.focusable.firstFocusable?.focus();
        event.preventDefault();
      }
    } else if (FocusTrap.isShiftTab(event)) {
      if (
        event.target instanceof HTMLElement &&
        this.focusable.isFirstFocusable(event.target)
      ) {
        this.focusable.lastFocusable?.focus();
        event.preventDefault();
      }
    }
  };

  /**
   * @param element HTMLElement where to set the focus trap.
   * @param config (optional) FocusableConfig.
   */
  constructor(private element: HTMLElement, private config?: FocusableConfig) {
    element.addEventListener('keydown', this.handleFocus);
    this.focusable = new Focusable(this.element, this.config);
    this.focusable.firstFocusable?.focus();
  }

  /**
   * Turn the focus trap off.
   */
  off() {
    this.element.removeEventListener('keydown', this.handleFocus);
  }
}
