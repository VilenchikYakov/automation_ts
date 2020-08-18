/**
 * TODO:
 * implementation of $$ selectors
 * implementation of different elements (examples: buttons, links, text fields, etc.)
 * implementation of selectors that aren't using 'data-auto' tags
 * making the element mandatory, without default '' value
 */

import { warn } from '../utils/logUtils';

export default class BaseElement {
  private _self: WebdriverIO.Element;
  private readonly _selector: string;
  private readonly _parentSelector: string;
  private readonly _parentElement: WebdriverIO.Element;
  constructor(element: string | WebdriverIO.Element = '', parentElement?: string | WebdriverIO.Element) {
    if (typeof parentElement === 'string') {
      if (parentElement === '') {
        this._parentSelector = null;
      } else {
        this._parentSelector = this.addDataAttribute(parentElement);
      }
    } else if (parentElement) {
      this._parentElement = parentElement;
      this._parentSelector = parentElement.selector;
    }

    if (typeof element === 'string') {
      if (element === '') {
        this._selector = element;
        return;
      }
      this._selector = this.addDataAttribute(element);
    } else {
      this._self = element;
      this._selector = this._self.selector;
    }
  }

  waitAndClick() {
    this.waitForExist(10000);
    try {
      this.waitForDisplayed(10000);
      this.waitForClickable({ timeout: 10000 });
      this.isAlone();
      this.click();
    } catch (err) {
      if (
        err.message.includes('not clickable') ||
        err.message.includes('not displayed') ||
        err.message.includes('not enabled')
      ) {
        warn(`WaitAndClick try again: ${err.message}`);
        this.scrollIntoView({ block: 'center' });
        this.isDisplayedInViewport();
        this.click();
      } else {
        throw new Error(`Wait and click: ${err}`);
      }
    }
  }

  isAlone() {
    if ($$(this.selector).length > 1) {
      warn(`Be careful! There are ${$$(this.selector).length} elements that go by '${this.selector}' selector`);
      return false;
    }
    return true;
  }

  waitAndSetValue(value: string) {
    this.waitForExist(10000);
    this.waitForDisplayed(10000);
    this.isAlone();
    this.click(); // added due to issue with enter value to searchField and no api event sent to BE
    if (
      // @ts-ignore
      (['mobile'].includes(browser.config.testEnvironment.platform) &&
        // @ts-ignore
        ['ios', 'iOS'].includes(browser.config.testEnvironment.osType)) ||
      driver.isIOS
    ) {
      this.self.setNativeValue(value);
    } else {
      this.setValue(value);
    }
  }

  /**
   * The `$$` command is a short way to call the [`findElements`](/docs/api/webdriver.html#findelements) command in order
   * to fetch multiple elements on the page similar to the `$$` command from the browser scope. The difference when calling
   * it from an element scope is that the driver will look within the children of that element.
   */
  $$(selector: string | Function): WebdriverIO.ElementArray {
    return this.self.$$(selector);
  }

  /**
   * The `$` command is a short way to call the [`findElement`](/docs/api/webdriver.html#findelement) command in order
   * to fetch a single element on the page similar to the `$` command from the browser scope. The difference when calling
   * it from an element scope is that the driver will look within the children of that element. You can also pass in an object as selector
   * where the object contains a property `element-6066-11e4-a52e-4f735466cecf` with the value of a reference
   * to an element. The command will then transform the reference to an extended WebdriverIO element.
   */
  $(selector: string | Function): WebdriverIO.Element {
    return this.self.$(selector);
  }

  /**
   * Add a value to an object found by given selector. You can also use unicode
   * characters like Left arrow or Back space. WebdriverIO will take care of
   * translating them into unicode characters. You’ll find all supported characters
   * [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions).
   * To do that, the value has to correspond to a key from the table. It can be disabled
   * by setting `translateToUnicode` optional parameter to false.
   */
  addValue(value: string | number | boolean | object | any[]): void {
    this.self.addValue(value);
  }

  /**
   * Clear a `<textarea>` or text `<input>` element’s value. Make sure you can interact with the
   * element before using this command. You can't clear an input element that is disabled or in
   * readonly mode.
   */
  clearValue(): void {
    this.self.clearValue();
  }

  /**
   * Click on an element.
   */
  click(options?: WebdriverIO.ClickOptions): void {
    this.self.click(options);
  }

  /**
   * The `customs$$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`
   */
  custom$$(strategyName: string, strategyArguments: any): WebdriverIO.ElementArray {
    return this.self.custom$$(strategyName, strategyArguments);
  }

  /**
   * The `custom$` allows you to use a custom strategy declared by using `browser.addLocatorStrategy`
   */
  custom$(strategyName: string, strategyArguments: any): WebdriverIO.Element {
    return this.self.custom$(strategyName, strategyArguments);
  }

  /**
   * Double-click on an element.
   */
  doubleClick(): void {
    this.self.doubleClick();
  }

  /**
   * Drag an item to a destination element.
   */
  dragAndDrop(target: WebdriverIO.Element, duration?: number): void {
    this.self.dragAndDrop(target, { duration });
  }

  /**
   * Get an attribute from a DOM-element based on the attribute name.
   */
  getAttribute(attributeName: string): string {
    return this.self.getAttribute(attributeName);
  }

  /**
   * Get a css property from a DOM-element selected by given selector.
   */
  getCSSProperty(cssProperty: string): WebdriverIO.CSSProperty {
    return this.self.getCSSProperty(cssProperty);
  }

  /**
   * Get source code of specified DOM element by selector.
   */
  getHTML(includeSelectorTag?: boolean): string {
    return this.self.getHTML(includeSelectorTag);
  }

  /**
   * Determine an element’s location on the page.
   */
  getLocation(prop?: WebdriverIO.LocationParam): number {
    return this.self.getLocation(prop);
  }

  /**
   * The Get Element Property command will return the result of getting a property of an element.
   */
  getProperty(property: string): object | string | boolean | number {
    return this.self.getProperty(property);
  }

  /**
   * Get the width and height for an DOM-element.
   */
  getSize(prop?: WebdriverIO.SizeParam): number {
    return this.self.getSize(prop);
  }

  /**
   * Get tag name of a DOM-element.
   */
  getTagName(): string {
    return this.self.getTagName();
  }

  /**
   * Get the text content from a DOM-element. Make sure the element
   * you want to request the text from [is interactable](http://www.w3.org/TR/webdriver/#interactable)
   * otherwise you will get an empty string as return value. If the element is disabled or not
   * visible and you still want to receive the text content use [getHTML](https://webdriver.io/docs/api/element/getHTML.html)
   * as a workaround.
   */
  getText(): string {
    return this.self.getText();
  }

  /**
   * Get the value of a `<textarea>`, `<select>` or text `<input>` found by given selector.
   * If multiple elements are found via the given selector, an array of values is returned instead.
   * For input with checkbox or radio type use isSelected.
   */
  getValue(): string {
    return this.self.getValue();
  }

  /**
   * Return true if the selected DOM-element:
   * - exists {
   * return this.self.}()
   * - is visible {
   * return this.self.}()
   * - is within viewport (if not try scroll to it) {
   * return this.self.}()
   * - its center is not overlapped with another element {
   * return this.self.}()
   * - is not disabled.
   */
  isClickable(): boolean {
    return this.self.isClickable();
  }

  /**
   * Return true if the selected DOM-element is displayed.
   */
  isDisplayed(): boolean {
    return this.self.isDisplayed();
  }

  /**
   * Return true if the selected DOM-element found by given selector is partially visible and within the viewport.
   */
  isDisplayedInViewport(): boolean {
    return this.self.isDisplayedInViewport();
  }

  /**
   * Return true or false if the selected DOM-element is enabled.
   */
  isEnabled(): boolean {
    return this.self.isEnabled();
  }

  /**
   * Return true if the selected element matches with the provided one.
   */
  isEqual(el: WebdriverIO.Element): boolean {
    return this.self.isEqual(el);
  }

  /**
   * Returns true if element exists in the DOM
   */
  isExisting(): boolean {
    return this.self.isExisting();
  }

  /**
   * Return true or false if the selected DOM-element currently has focus. If the selector matches
   * multiple elements, it will return true if one of the elements has focus.
   */
  isFocused(): boolean {
    return this.self.isFocused();
  }

  /**
   * Will return true or false whether or not an `<option>` or `<input>` element of type
   * checkbox or radio is currently selected.
   */
  isSelected(): boolean {
    return this.self.isSelected();
  }

  /**
   * Move the mouse by an offset of the specified element. If no element is specified,
   * the move is relative to the current mouse cursor. If an element is provided but
   * no offset, the mouse will be moved to the center of the element. If the element
   * is not visible, it will be scrolled into view.
   */
  moveTo(xOffset?: number, yOffset?: number): void {
    this.self.moveTo({ xOffset, yOffset });
  }

  /**
   * The `react$$` command is a useful command to query multiple React Components
   * by their actual name and filter them by props and state.
   */
  react$$(
    selector: string,
    props?: object,
    state?: any[] | number | string | object | boolean,
  ): WebdriverIO.ElementArray {
    return this.self.react$$(selector, { props, state });
  }

  /**
   * The `react$` command is a useful command to query React Components by their
   * actual name and filter them by props and state.
   */
  react$(selector: string, props?: object, state?: any[] | number | string | object | boolean): WebdriverIO.Element {
    return this.self.react$(selector, { props, state });
  }

  /**
   * Save a screenshot of an element to a PNG file on your OS.
   */
  saveScreenshot(filename: string): Buffer {
    return this.self.saveScreenshot(filename);
  }

  /**
   * Scroll element into viewport.
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
   */
  scrollIntoView(scrollIntoViewOptions?: object | boolean): void {
    this.self.scrollIntoView(scrollIntoViewOptions);
  }

  /**
   * Select option with a specific value.
   */
  selectByAttribute(attribute: string, value: string): void {
    this.self.selectByAttribute(attribute, value);
  }

  /**
   * Select option with a specific index.
   */
  selectByIndex(index: number): void {
    this.self.selectByIndex(index);
  }

  /**
   * Select option with displayed text matching the argument.
   */
  selectByVisibleText(text: string): void {
    this.self.selectByVisibleText(text);
  }

  /**
   * Send a sequence of key strokes to an element (clears value before). If the element
   * doesn't need to be cleared first then use addValue. You can also use
   * unicode characters like Left arrow or Back space. WebdriverIO will take care of
   * translating them into unicode characters. You’ll find all supported characters
   * [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions).
   * To do that, the value has to correspond to a key from the table. It can be disabled
   * by setting `translateToUnicode` optional parameter to false.
   */
  setValue(value: string | number | boolean | object | any[]): void {
    this.self.setValue(value);
  }

  /**
   * Access elements inside a given element's shadowRoot
   */
  shadow$$(selector: string | Function): WebdriverIO.ElementArray {
    return this.self.shadow$$(selector);
  }

  /**
   * Access an element inside a given element's shadowRoot
   */
  shadow$(selector: string | Function): WebdriverIO.Element {
    return this.self.shadow$(selector);
  }

  /**
   * [appium] The Touch Action API provides the basis of all gestures that can be automated in Appium.
   */
  touchAction(action: WebdriverIO.TouchActions): void {
    this.self.touchAction(action);
  }

  /**
   * Wait for an element for the provided amount of
   * milliseconds to be clickable or not clickable.
   */
  waitForClickable(options?: WebdriverIO.WaitForOptions): boolean {
    return this.self.waitForClickable(options);
  }

  /**
   * Wait for an element for the provided amount of
   * milliseconds to be displayed or not displayed.
   */
  waitForDisplayed(timeout?: number, reverse?: boolean, timeoutMsg?: string, interval?: number): boolean {
    return this.self.waitForDisplayed({ timeout, reverse, timeoutMsg, interval });
  }

  /**
   * Wait for an element (selected by css selector) for the provided amount of
   * milliseconds to be (dis/en)abled. If multiple elements get queried by given
   * selector, it returns true if at least one element is (dis/en)abled.
   */
  waitForEnabled(timeout?: number, reverse?: boolean, timeoutMsg?: string, interval?: number): boolean {
    return this.self.waitForEnabled({ timeout, reverse, timeoutMsg, interval });
  }

  /**
   * Wait for an element for the provided amount of
   * milliseconds to be present within the DOM. Returns true if the selector
   * matches at least one element that exists in the DOM, otherwise throws an
   * error. If the reverse flag is true, the command will instead return true
   * if the selector does not match any elements.
   */
  waitForExist(timeout?: number, reverse?: boolean, timeoutMsg?: string, interval?: number): boolean {
    return this.self.waitForExist({ timeout, reverse, timeoutMsg, interval });
  }

  optionalWaitForExist(timeout?: number, reverse?: boolean, timeoutMsg?: string, interval?: number): boolean {
    try {
      return this.self.waitForExist({ timeout, reverse, timeoutMsg, interval });
    } catch (error) {
      warn(reverse ? `The element ${this.selector} still exists` : `The element ${this.selector} doesn't exist`);
      return false;
    }
  }

  optionalWaitForDisplayed(timeout?: number, reverse?: boolean, timeoutMsg?: string, interval?: number): boolean {
    try {
      return this.self.waitForDisplayed({ timeout, reverse, timeoutMsg, interval });
    } catch (error) {
      warn(reverse ? `The element ${this.selector} still exists` : `The element ${this.selector} doesn't exist`);
      return false;
    }
  }

  private addDataAttribute(selector: string) {
    return selector.includes('data-auto') ? selector : `[data-auto="${selector}"]`;
  }

  get selector() {
    return this._parentSelector ? `${this._parentSelector} ${this._selector}` : this._selector;
  }

  get self() {
    // @ts-ignore
    if (!this._self || this._self.error?.error?.includes('no such element')) {
      this._self = this._parentElement ? this._parentElement.$(this._selector) : $(this.selector);
    }
    return this._self;
  }
}
