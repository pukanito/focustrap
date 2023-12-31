export { Focusable, FocusableConfig };

/**
 * Focusable configuration.
 */
interface FocusableConfig {
  /**
   * All queryselectors separated by a comma. Only Elements found by querying
   * with these selectors are considered keyboard focusable.
   */
  focusableElementSelectors: string;
  /**
   * Predicate that returns true if the element is keyboard focusable. Only elements
   * queried by the focusableElementSelectors are handed to the predicate.
   *
   * @param el the element to check.
   */
  isFocusablePredicate: (el: HTMLElement) => boolean;
}

/**
 * An object that keeps track of focusable child HTMLElements of a specified parent HTMLElement.
 */
class Focusable {
  // Queryselectors from specified config or default config.
  private focusableElementSelectors =
    this.config?.focusableElementSelectors ||
    Focusable.defaultFocusableConfig.focusableElementSelectors;
  // Predicate from specified config or default config.
  private isFocusablePredicate =
    this.config?.isFocusablePredicate ||
    Focusable.defaultFocusableConfig.isFocusablePredicate;

  /**
   * @param containerElement the HTMLElement from where to find keyboard focusables (optional,
   *   default: document.documentElement).
   * @param config FocusableConfig (optional, default: defaultFocusableConfig).
   */
  constructor(
    private containerElement: HTMLElement = document.documentElement,
    private config: FocusableConfig = Focusable.defaultFocusableConfig
  ) {}

  /**
   * @return all keyboard focusable HTMLElements of the container element.
   */
  get focusables(): HTMLElement[] {
    return Array.from(
      this.containerElement.querySelectorAll<HTMLElement>(
        this.focusableElementSelectors
      )
    ).filter(this.isFocusablePredicate);
  }

  /**
   * @return the first focusable HTMLElement of the container element.
   */
  get firstFocusable(): HTMLElement | null {
    const focusables = this.focusables;
    return focusables.length > 0 ? focusables[0] : null;
  }

  /**
   * @return the last focusable HTMLElement of the container element.
   */
  get lastFocusable(): HTMLElement | null {
    const focusables = this.focusables;
    return focusables.length > 0 ? focusables[focusables.length - 1] : null;
  }

  /**
   * @return true if this is the first focusable HTMLElement of the container element.
   *
   * @param el the HTMLElement to check.
   */
  isFirstFocusable(el: HTMLElement): boolean {
    return el === this.firstFocusable;
  }

  /**
   * @return true if this is the last focusable HTMLElement of the container element.
   *
   * @param el the HTMLElement to check.
   */
  isLastFocusable(el: HTMLElement): boolean {
    return el === this.lastFocusable;
  }

  /**
   * @return the default configuration, can be used to derive a custom configuration.
   */
  static get defaultConfig(): FocusableConfig {
    return { ...Focusable.defaultFocusableConfig };
  }

  // Array of selectors of all possibly focusable elements (Must be HTMLElements).
  private static defaultFocusableElementSelectors = [
    'a[href]:not([inert]):not([inert] *)',
    'area[href]:not([inert] *)',
    'button:not([disabled]):not([inert]):not([inert] *)',
    'summary:not([inert]):not([inert] *)',
    'details:not([inert]):not([inert] *)',
    'input:not([disabled]):not([inert]):not([inert] *)',
    'select:not([disabled]):not([inert]):not([inert] *)',
    'textarea:not([disabled]):not([inert]):not([inert] *)',
    'object:not([inert]):not([inert] *)',
    'audio[controls]:not([inert]):not([inert] *)',
    'video[controls]:not([inert]):not([inert] *)',
    '[contentEditable=""]:not([inert]):not([inert] *)',
    '[contentEditable="true"]:not([inert]):not([inert] *)',
    'iframe:not([inert]):not([inert] *)',
    '[tabindex]:not([inert]):not([inert] *)',
  ].join(',');

  /**
   * Default configuration.
   */
  private static defaultFocusableConfig: FocusableConfig = {
    focusableElementSelectors: this.defaultFocusableElementSelectors,
    // isFocusablePredicate works on the focusableElementSelectors result.
    isFocusablePredicate: (el: HTMLElement) => this.isFocusable(el),
  };

  /**
   * Helpers for isFocusablePredicate.
   */
  // Returns true if the element is focusable.
  private static isFocusable = (el: HTMLElement) =>
    this.isVisible(el) &&
    this.isNotDisabled(el) &&
    // Only the checked radio button of a group is focusable.
    (this.isNotUncheckedRadio(el) || this.isFirstRadioOfUncheckedGroup(el)) &&
    (this.isTabbableHtmlElement(el) || this.isTabbableWithoutTabIndex(el));

  // Returns true if the element is visible.
  private static isVisible = (el: HTMLElement) =>
    // For AREA, check if the IMG is visible.
    [this.hasVisibility, this.isDisplayed].every(
      (fn) => fn(el) && this.checkImgOfArea(fn)(el)
    );

  // Returns true if the element is visible because the computed visibility (style) does not hide it
  // or the visibility style has no effect on the element.
  private static hasVisibility = (el: HTMLElement) =>
    getComputedStyle(el).visibility !== 'hidden' ||
    this.cannotVisibilityElements.includes(el.tagName.toUpperCase());

  // Elements where the visibility style has no effect (only those selected from 'focusableElementSelectors').
  private static cannotVisibilityElements = [/* "MAP", */ 'AREA'];

  // Returns true if the element is displayed (checks display style), or the display style has no effect on the element.
  // The element has 'display: none' when it has the 'hidden' attribute, hence not displayed then.
  private static isDisplayed = (el: HTMLElement): boolean =>
    (getComputedStyle(el).display !== 'none' ||
      this.cannotDisplayElements.includes(el.tagName.toUpperCase())) &&
    (el.parentElement ? this.isDisplayed(el.parentElement) : true);

  // Elements where the display style has no effect (only those selected from 'focusableElementSelectors').
  private static cannotDisplayElements = [/* "MAP", */ 'AREA'];

  // Returns true if the element is disabled (and can be disabled), or cannot be disabled.
  // Part of this check is already in the selectors.
  private static isDisabled = (el: HTMLElement): boolean =>
    ((el.hasAttribute('disabled') &&
      this.disableableElements.includes(el.tagName.toUpperCase())) ||
      (el.parentElement ? this.isDisabled(el.parentElement) : false)) &&
    this.isNotFormElementInsideLegend(el);

  // Returns true if the element is NOT disabled (and can be disabled).
  // 'disabled' is not inherited, need to check parents ourselves.
  private static isNotDisabled = (el: HTMLElement) => !this.isDisabled(el);

  private static disableableElements = [
    'BUTTON',
    'FIELDSET',
    'INPUT',
    // "OPTGROUP",  // only those selected from 'focusableElementSelectors'.
    // "OPTION",  // only those selected from 'focusableElementSelectors'.
    'SELECT',
    'TEXTAREA',
  ];

  // Returns true if the element has a parent element with the specified tag.
  private static hasParentElement = (
    el: HTMLElement,
    tagName: string
  ): boolean =>
    !!el.parentElement &&
    (el.parentElement.tagName.toUpperCase() === tagName ||
      this.hasParentElement(el.parentElement, tagName));

  // Returns true if the element is an INPUT inside a LEGEND
  private static isFormElementInsideLegend = (el: HTMLElement) =>
    this.formElements.includes(el.tagName.toUpperCase()) &&
    this.hasParentElement(el, 'LEGEND');

  // Returns true if the element is not an INPUT inside a LEGEND.
  private static isNotFormElementInsideLegend = (el: HTMLElement) =>
    !this.isFormElementInsideLegend(el);

  private static formElements = [
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

  // If the element is an AREA, check the corresponding IMG, otherwise return true:
  // if the IMG is inert return false, otherwise return the predicate result of the IMG.
  // AREA (and MAP) hidden/visibility/display only depend on the IMG's state.
  private static checkImgOfArea =
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
        if (imgElement.hasAttribute('inert')) return false;
        if (imgElement) return predicate(imgElement);
      }
      return true;
    };

  // Return true if the element is not a radio button.
  private static isNotRadio = (el: HTMLElement) =>
    el.tagName.toUpperCase() !== 'INPUT' ||
    el.getAttribute('type')?.toUpperCase() !== 'RADIO';

  // Return true if the element is not a radio button or it is a checked radio button.
  private static isNotUncheckedRadio = (el: HTMLElement) =>
    this.isNotRadio(el) || (el as HTMLInputElement).checked;

  // Return true if the element is not a radio button or it is the first radio button of a group
  // with only unchecked radio buttons.
  private static isFirstRadioOfUncheckedGroup = (el: HTMLElement) =>
    this.isNotRadio(el) ||
    (document.querySelector(`input[name="${el.getAttribute('name')}"]`) ===
      el &&
      Array.from(
        document.querySelectorAll(`input[name="${el.getAttribute('name')}"]`)
      ).every((el) => !(el as HTMLInputElement).checked));

  // Return true if the element is a HTMLElement and has tabindex > -1.
  private static isTabbableHtmlElement = (el: HTMLElement) =>
    el instanceof HTMLElement && el.tabIndex > -1;

  // Return true if the element is one of the tabbable elements with tabindex equal to -1.
  private static isTabbableWithoutTabIndex = (el: HTMLElement) =>
    // DETAILS without SUMMARY has a tabIndex of -1, but is tabbable.
    this.checkDetailsWithoutSummary(() => true)(el) ||
    // AUDIO with CONTROLS has a tabIndex of -1, but is tabbable.
    el.tagName.toUpperCase() === 'AUDIO' ||
    // VIDEO with CONTROLS has a tabIndex of -1, but is tabbable.
    el.tagName.toUpperCase() === 'VIDEO' ||
    // CONTENTEDITABLE has a tabIndex of -1, but is tabbable.
    el.getAttribute('contenteditable')?.toUpperCase() === 'TRUE' ||
    el.getAttribute('contenteditable') === '';

  // If the element is a DETAILS element, check if it has a SUMMARY child element, otherwise return false.
  // If it has no SUMMARY child return the DETAILS predicate result, otherwise return false.
  private static checkDetailsWithoutSummary =
    (predicate: (el: HTMLElement) => boolean) => (el: HTMLElement) =>
      el.tagName.toUpperCase() !== 'DETAILS' ||
      Array.from(el.children).some((c) => c.tagName.toUpperCase() === 'SUMMARY')
        ? false
        : predicate(el);
}
