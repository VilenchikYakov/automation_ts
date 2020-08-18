import { isMobileDeviceInUse } from '../../utils/generalUtils';
import { info, warn } from '../../utils/logUtils';
import { iRequiredSuggestion, iSuggestionObject, iSuggestionsObject } from '../../interfaces';
import BaseElement from '../baseElement';
import SuggestionsBlock from '../commonPages/blocks/commonBlocks/suggestionsBlock';

export default class SearchInput extends BaseElement {
  readonly suggestions = new SuggestionsBlock();
  constructor(parentElement = '') {
    super('autocomplete-textfield', parentElement);
  }

  /**
   * Set value and find random suggestion
   */
  setValueAndChooseRandomSuggestion(
    value: string,
    overlay: boolean = false,
    city?: string,
    maxChecks: number = 10,
  ): iSuggestionObject {
    this.mobileClickSearchInput();
    this.clearInput();
    const suggestionTextsBeforeSearch: string[] = this.suggestions.getSuggestionsTexts();
    this.setInputValue(value, overlay);
    this.suggestions.waitUntilSuggestionsRefreshed(suggestionTextsBeforeSearch, value, maxChecks);
    const suggestObj = this.suggestions.chooseRandomSuggestion();
    if (isMobileDeviceInUse()) {
      this.clickDoneButtonMobile();
    }
    return suggestObj;
  }

  /**
   * Set value and find suggestion by index
   */
  setValueAndChooseSuggestion(suggData: iRequiredSuggestion): iSuggestionObject {
    this.mobileClickSearchInput();
    if (suggData.clearBefore || suggData.clearBefore === undefined) {
      this.clearInput();
    }
    const suggestionTextsBeforeSearch: string[] = this.suggestions.getSuggestionsTexts();
    this.setInputValue(suggData.value.toString(), suggData.overlay);
    this.suggestions.waitUntilSuggestionsRefreshed(suggestionTextsBeforeSearch, suggData.value, suggData.maxChecks);
    const suggestion = this.suggestions.chooseSuggestion(suggData.value.toString(), suggData.type);
    if (isMobileDeviceInUse()) {
      this.clickDoneButtonMobile();
    }
    return suggestion;
  }

  /**
   * Set value and wait suggestion
   */
  setValueAndWaitFirstSuggestion(value: string, maxChecks: number = 10) {
    this.mobileClickSearchInput();
    this.clearInput();
    const suggestionTextsBeforeSearch: string[] = this.suggestions.getSuggestionsTexts();
    this.setInputValue(value);
    this.suggestions.waitUntilSuggestionsRefreshed(suggestionTextsBeforeSearch, value, maxChecks);
    browser.waitUntil(
      () => {
        const suggestion = this.suggestions.firstSuggestion.getText().includes(value);
        if (isMobileDeviceInUse()) {
          this.clickDoneButtonMobile();
        }
        return suggestion;
      },
      { timeout: 10000, timeoutMsg: info(`${value} was not appeared in first suggestion`) },
    );
  }

  /**
   * Set value and find suggestion by name
   */
  setValueAndChooseSuggestionByName(
    value: string,
    overlay: boolean = false,
    maxChecks: number = 10,
  ): iSuggestionObject {
    this.mobileClickSearchInput();
    this.clearInput();
    const suggestionTextsBeforeSearch: string[] = this.suggestions.getSuggestionsTexts();
    this.setInputValue(value, overlay);
    this.suggestions.waitUntilSuggestionsRefreshed(suggestionTextsBeforeSearch, value, maxChecks);
    const suggestion = this.suggestions.chooseSuggestionByName(value);
    if (isMobileDeviceInUse()) {
      this.mobileDoneButton.waitAndClick();
    }
    return suggestion;
  }

  setValueGetSuggestions(suggData: iRequiredSuggestion): iSuggestionsObject {
    this.mobileClickSearchInput();
    this.clearInput();
    const suggestionTextsBeforeSearch: string[] = this.suggestions.getSuggestionsTexts();
    this.setInputValue(suggData.value.toString(), suggData.overlay);
    this.suggestions.waitUntilSuggestionsRefreshed(suggestionTextsBeforeSearch, suggData.value, suggData.maxChecks);
    const suggestionTexts = this.suggestions.getSuggestionsTexts();
    const suggestionTypes = this.suggestions.getSuggestionsTypes();
    return { suggestionTexts: suggestionTexts, suggestionTypes: suggestionTypes };
  }

  setInputValue(value: string, overlay: boolean = false) {
    info(`Set value: ${value} - overlay: ${overlay}`);
    if (overlay) {
      this.input.waitAndClick();
    }
    const input = isMobileDeviceInUse() ? this.overlayInput : this.input;

    input.waitAndSetValue(value);
  }

  waitAndGetValue() {
    this.waitUntilValueIsNotEmpty();
    return this.input.getValue();
  }

  waitUntilValueIsNotEmpty() {
    this.input.waitForDisplayed(10000);
    browser.waitUntil(() => this.input.getValue() !== '', { timeout: 10000, timeoutMsg: 'Input value is still empty' });
  }

  clearInput() {
    if (isMobileDeviceInUse()) {
      if (this.mobileMultiSearchInputWrapper.optionalWaitForExist(2000)) {
        info(`mobile client multi-search is available, working with it`);
        this.clearSelectedValues();
      } else {
        info('mobile client multi-search is not available, continue as regular search field');
        this.clearNonMultiSearchInput();
      }
    } else {
      if (this.desktopMultiSearchInputWrapper.optionalWaitForExist(2000)) {
        info(`desktop client multi-search is available, working with it`);
        this.desktopMultiSearchInputWrapper.waitAndClick();
        this.clearSelectedValues();
        this.desktopMultiSearchInputWrapper.waitAndClick();
      } else {
        this.input.waitAndClick();
        this.clearNonMultiSearchInput();
      }
    }
  }

  mobileClickSearchInput() {
    if (isMobileDeviceInUse()) {
      info('Click search input field on mobile device in order to reach overlay searchInput');
      if (this.mobileMultiSearchInputWrapper.optionalWaitForExist(3000)) {
        info(`mobile client multi-search is available, click it`);
        this.mobileMultiSearchInputWrapper.waitAndClick();
      } else {
        info('mobile client multi-search is not available, click regular searchInput');
        this.input.waitAndClick();
      }
    } else {
      warn('desktop device is in use, no need to click it');
    }
  }

  clickDoneButtonMobile() {
    if (this.mobileMultiSearchInputWrapper.optionalWaitForExist(3000)) {
      this.mobileDoneButton.waitAndClick();
    } else {
      warn('No done button available, continue');
    }
  }

  clearNonMultiSearchInput() {
    const input = isMobileDeviceInUse() ? this.overlayInput : this.input;
    if (this.clearSearchInput.isExisting()) {
      info(`searchInput has clear element, working with it to clear element`);
      this.clearSearchInput.waitAndClick();
      if (input.getValue() !== '') {
        input.setValue('\uE003'.repeat(input.getValue().length));
      }
    } else {
      info('no clear element available, working woth backspace to clear element');
      input.setValue('\uE003'.repeat(input.getValue().length));
    }
  }

  clearSelectedValues() {
    info('Clear previously selected values');
    const selectedValuesList = isMobileDeviceInUse() ? this.mobileSelectedValuesList : this.desktopSelectedValuesList;
    info(`selected values count: ${selectedValuesList.length}`);
    if (selectedValuesList.length > 0) {
      selectedValuesList.forEach((selectedValue) => {
        selectedValue.waitAndClick();
      });
    } else {
      this.clearNonMultiSearchInput();
    }
  }

  waitValueMultiSearch(value: string) {
    info('getting value from search input');
    const siValue = this.searchInputValue();
    browser.waitUntil(() => siValue.toLowerCase().includes(value.toLowerCase()), {
      timeout: 10000,
      timeoutMsg: `${siValue.toLowerCase()} does not include value: ${value.toLowerCase()}`,
    });
  }

  searchInputValue(): any {
    info('getting value from search input');
    let searchInput;
    if (isMobileDeviceInUse()) {
      searchInput = this.mobileMultiSearchInputWrapper.optionalWaitForExist(5000)
        ? this.mobileMultiSearchInputWrapper
        : this.overlayInput;
    } else {
      searchInput = this.desktopMultiSearchInputWrapper.optionalWaitForExist(5000)
        ? this.desktopMultiSearchInputWrapper
        : this.input;

      const value = searchInput.getText();
      info(`value: ${value}`);
      return value;
    }
  }

  get input() {
    return this;
  }

  get overlayInput() {
    return new BaseElement('autocomplete-textfield', 'overlayRoot'); // Mobile input
  }

  get clearSearchInput() {
    return new BaseElement('search-clear');
  }

  get desktopSelectedValuesList(): BaseElement[] {
    return $$('[data-auto="autocomplete-selected-value"]').map((element) => new BaseElement(element));
  }

  get mobileSelectedValuesList(): BaseElement[] {
    const overlayRoot = new BaseElement('overlayRoot');
    return overlayRoot.$$('[data-auto="autocomplete-selected-value"]').map((element) => new BaseElement(element));
  }

  get multiSearchInputWrapper() {
    return new BaseElement($('.multi-search-input-wrapper'));
  }

  get desktopMultiSearchInputWrapper() {
    return new BaseElement('desktop-multi-search-wrapper');
  }

  get mobileMultiSearchInputWrapper() {
    return new BaseElement('mobile-multi-search-wrapper');
  }

  get mobileDoneButton() {
    return new BaseElement('mobile-done-button');
  }
}
