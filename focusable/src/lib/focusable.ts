export { Focusable, FocusableConfig, focusableDefaultConfig };

/**
 * Focusable configuration.
 */
interface FocusableConfig {
  /**
   * All query selectors separated by a comma. Only Elements found by querying with these selectors
   * are considered focusable.
   */
  focusableElementSelectors: string;
  isFocusablePredicate: (el: HTMLElement) => boolean;
}

/**
 * Return a Focusable object.
 *
 * @param element the root element from where to find focusables (optional, default: document.documentElement).
 * @param config FocusableConfig (optional, default: focusableDefaultConfig).
 */
function Focusable(
  element: HTMLElement = document.documentElement,
  config: FocusableConfig = focusableDefaultConfig
) {
  const focusableElementSelectors =
    config?.focusableElementSelectors ||
    focusableDefaultConfig.focusableElementSelectors;
  const isFocusablePredicate =
    config?.isFocusablePredicate || focusableDefaultConfig.isFocusablePredicate;
  return {
    get focusables(): HTMLElement[] {
      return Array.from(
        element.querySelectorAll<HTMLElement>(focusableElementSelectors)
      ).filter(isFocusablePredicate);
    },

    get firstFocusable(): HTMLElement | null {
      const focusables = this.focusables;
      return focusables.length > 0 ? focusables[0] : null;
    },

    get lastFocusable(): HTMLElement | null {
      const focusables = this.focusables;
      return focusables.length > 0 ? focusables[focusables.length - 1] : null;
    },

    isFirstFocusable(el: HTMLElement): boolean {
      return el === this.firstFocusable;
    },

    isLastFocusable(el: HTMLElement): boolean {
      return el === this.lastFocusable;
    },
  };
}

// Array of selectors of all possibly focusable elements (Must be HTMLElements).
const focusableElementSelectors = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'summary',
  'details',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'object',
  'audio[controls]',
  'video[controls]',
  '[contentEditable=""]',
  '[contentEditable="true"]',
  'iframe',
  '[tabindex]',
].join(',');

/**
 * Default configuration.
 */
const focusableDefaultConfig: FocusableConfig = {
  focusableElementSelectors,
  // isFocusablePredicate works on the focusableElementSelectors result.
  isFocusablePredicate: (el: HTMLElement) => isFocusable(el),
};

/**
 * Helpers.
 */
// Returns true if the element is focusable.
const isFocusable = (el: HTMLElement) =>
  isVisible(el) &&
  isNotDisabled(el) &&
  // Only the checked radio button of a group is focusable.
  (isNotUncheckedRadio(el) || isFirstRadioOfUncheckedGroup(el)) &&
  (isTabbableHtmlElement(el) || isTabbableWithoutTabIndex(el));

// Returns true if the element is visible.
const isVisible = (el: HTMLElement) =>
  // For AREA, check if the IMG is visible.
  [hasVisibility, isNotHidden, isDisplayed].every(
    (fn) => fn(el) && checkImgOfArea(fn)(el)
  );

// Returns true if the element is visible because there is no 'hidden' attribute that hides it, or
// the 'hidden' attribute has no effect on the element. 'hidden' is not inherited, need to check parents ourselves.
const isNotHidden = (el: HTMLElement) =>
  !el.hasAttribute('hidden') ||
  cannotHiddenElements.includes(el.tagName.toUpperCase());

// Elements where the 'hidden' attribute has no effect (only those selected from 'focusableElementSelectors').
const cannotHiddenElements = [/* "MAP", */ 'AREA'];

// Returns true if the element is visible because the computed visibility (style) does not hide it
// or the visibility style has no effect on the element.
const hasVisibility = (el: HTMLElement) =>
  getComputedStyle(el).visibility !== 'hidden' ||
  cannotVisibilityElements.includes(el.tagName.toUpperCase());

// Elements where the visibility style has no effect (only those selected from 'focusableElementSelectors').
const cannotVisibilityElements = [/* "MAP", */ 'AREA'];

// Returns true if the element is displayed (checks display style), or the display style has no effect on the element.
const isDisplayed = (el: HTMLElement): boolean =>
  (getComputedStyle(el).display !== 'none' ||
    cannotDisplayElements.includes(el.tagName.toUpperCase())) &&
  (el.parentElement ? isDisplayed(el.parentElement) : true);

// Elements where the visibility style has no effect (only those selected from 'focusableElementSelectors').
const cannotDisplayElements = [/* "MAP", */ 'AREA'];

// Returns true if the element is disabled (and can be disabled), or cannot be disabled.
// Part of this check is already in the selectors.
const isDisabled = (el: HTMLElement): boolean =>
  ((el.hasAttribute('disabled') &&
    disableableElements.includes(el.tagName.toUpperCase())) ||
    (el.parentElement ? isDisabled(el.parentElement) : false)) &&
  isNotFormElementInsideLegend(el);

// Returns true if the element is NOT disabled (and can be disabled).
// 'disabled' is not inherited, need to check parents ourselves.
const isNotDisabled = (el: HTMLElement) => !isDisabled(el);

const disableableElements = [
  'BUTTON',
  'FIELDSET',
  'INPUT',
  // "OPTGROUP",  // only those selected from 'focusableElementSelectors'.
  // "OPTION",  // only those selected from 'focusableElementSelectors'.
  'SELECT',
  'TEXTAREA',
];

// Returns true if the element has a parent element with the specified tag.
const hasParentElement = (el: HTMLElement, tagName: string): boolean =>
  !!el.parentElement &&
  (el.parentElement.tagName.toUpperCase() === tagName ||
    hasParentElement(el.parentElement, tagName));

// Returns true if the element is an INPUT inside a LEGEND
const isFormElementInsideLegend = (el: HTMLElement) =>
  formElements.includes(el.tagName.toUpperCase()) &&
  hasParentElement(el, 'LEGEND');

// Returns true if the element is not an INPUT inside a LEGEND.
const isNotFormElementInsideLegend = (el: HTMLElement) =>
  !isFormElementInsideLegend(el);

const formElements = [
  'BUTTON',
  // "DATALIST",  // only those selected from 'focusableElementSelectors'.
  'FIELDSET',
  'INPUT',
  // "LABEL",  // only those selected from 'focusableElementSelectors'.
  // "LEGEND",  // only those selected from 'focusableElementSelectors'.
  // "OPTGROUP",  // only those selected from 'focusableElementSelectors'.
  // "OPTION",  // only those selected from 'focusableElementSelectors'.
  // "OUTPUT",  // only those selected from 'focusableElementSelectors'.
  'SELECT',
  'TEXTAREA',
];

// If the element is an AREA, return the corresponding IMG's predicate result, otherwise return true.
// AREA (and MAP) hidden/visibility/display only depend on the IMG's state.
const checkImgOfArea =
  (predicate: (el: HTMLElement) => boolean) => (el: HTMLElement) => {
    // if the tag is not AREA, then return the predicate result.
    if (el.tagName.toUpperCase() !== 'AREA') return true;
    // Return the parent of the element with the specified tag name, or undefined if not found.
    const getParentTag = (el: HTMLElement, tagName: string) =>
      el.parentElement?.tagName.toUpperCase() === tagName.toUpperCase()
        ? el.parentElement
        : undefined;
    const mapElement = getParentTag(el, 'MAP') as HTMLMapElement;
    if (mapElement) {
      // Get the img that uses the map.
      const imgElement = document.querySelector(
        `img[usemap="#${mapElement.name}"]`
      ) as HTMLElement;
      if (imgElement) return predicate(imgElement);
    }
    return true;
  };

// Return true if the element is not a radio button.
const isNotRadio = (el: HTMLElement) =>
  el.tagName.toUpperCase() !== 'INPUT' ||
  el.getAttribute('type')?.toUpperCase() !== 'RADIO';

// Return true if the element is not a radio button or it is a checked radio button.
const isNotUncheckedRadio = (el: HTMLElement) =>
  isNotRadio(el) || (el as HTMLInputElement).checked;

// Return true if the element is not a radio button or it is the first radio button of a group
// with only unchecked radio buttons.
const isFirstRadioOfUncheckedGroup = (el: HTMLElement) =>
  isNotRadio(el) ||
  (document.querySelector(`input[name="${el.getAttribute('name')}"]`) === el &&
    Array.from(
      document.querySelectorAll(`input[name="${el.getAttribute('name')}"]`)
    ).every((el) => !(el as HTMLInputElement).checked));

// Return true if the element is a HTMLElement and has tabindex > -1.
const isTabbableHtmlElement = (el: HTMLElement) =>
  el instanceof HTMLElement && el.tabIndex > -1;

// Return true if the element is one of the tabbable elements with tabindex equal to -1.
const isTabbableWithoutTabIndex = (el: HTMLElement) =>
  // DETAILS without SUMMARY has a tabIndex of -1, but is tabbable.
  checkDetailsWithoutSummary(() => true)(el) ||
  // AUDIO with CONTROLS has a tabIndex of -1, but is tabbable.
  el.tagName.toUpperCase() === 'AUDIO' ||
  // VIDEO with CONTROLS has a tabIndex of -1, but is tabbable.
  el.tagName.toUpperCase() === 'VIDEO' ||
  // CONTENTEDITABLE has a tabIndex of -1, but is tabbable.
  el.getAttribute('contenteditable')?.toUpperCase() === 'TRUE' ||
  el.getAttribute('contenteditable') === '';

// If the element is a DETAILS element, check if it has a SUMMARY child element, otherwise return false.
// If it has no SUMMARY child return the DETAILS predicate result, otherwise return false.
const checkDetailsWithoutSummary =
  (predicate: (el: HTMLElement) => boolean) => (el: HTMLElement) =>
    el.tagName.toUpperCase() !== 'DETAILS' ||
    Array.from(el.children).some((c) => c.tagName.toUpperCase() === 'SUMMARY')
      ? false
      : predicate(el);
