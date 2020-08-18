import BaseElement from '../../../baseElement';
import { info, warn } from '../../../../utils/logUtils';
import {
  generateRandomNumber,
  isMadlan,
  arraysEqual,
  itemFromArrayIncludedInSecondArray,
  valueIncludesItemFromArray,
} from '../../../../utils/generalUtils';
import { iSuggestionObject } from '../../../../interfaces';
import { params } from '../../../../configs/config';
import { LocalizeCities } from '../../../../enums';
import { replaceLocalizeSearchedStreetRepresentation, localizeAddressData } from '../../../../utils/testDataUtils';
import SuggestionBlock from './suggestionBlock';

export default class SuggestionsBlock extends BaseElement {
  constructor() {
    super('autocomplete-suggestions');
  }

  chooseSuggestionByName(name: string): iSuggestionObject {
    let city: string[];
    if (!isMadlan()) {
      // TODO this code should be fixed as soon as prod decide how to work with additional cities
      // TODO revert this back as soon as localize HP at production will dsisplay NewYork as NY
      city = this.getLocalizeCity();
    }
    const suggestions = this.getSuggestions();
    info(`suggestions: ${suggestions} - len: ${suggestions.length}`);
    if (suggestions.length === 0) {
      throw new Error(`0 suggestions collected upon search of: ${name}`);
    }
    let counter = 0;
    for (const suggestion of suggestions) {
      if (
        isMadlan()
          ? suggestion.suggestionText.getText().toLowerCase() === name.toLowerCase()
          : valueIncludesItemFromArray(
              replaceLocalizeSearchedStreetRepresentation(name.toString()),
              suggestion.suggestionText.getText().toLowerCase(),
            ) && city.includes(localizeAddressData(suggestion.suggestionText.getText(), 'city'))
      ) {
        const suggestionObj = {
          suggestionType: suggestion.suggestionType.isExisting()
            ? suggestion.suggestionType.getText()
            : { isSkip: true },
          suggestionText: suggestion.suggestionText.getText(),
          selectedNeighbourhood: suggestion.suggestionText.getText().split(',').shift(),
        };
        suggestion.waitAndClick();
        return suggestionObj;
      } else {
        info(`suggestion at index ${counter} does not meet check requirements`);
        counter++;
      }
    }
    if (counter === suggestions.length) {
      throw new Error(`Suggester does not have name: ${name}`);
    }
  }

  chooseSuggestion(text: string, type?: string): iSuggestionObject {
    let city: string[];
    if (!isMadlan()) {
      // TODO this code should be fixed as soon as prod decide how to work with additional cities
      // TODO revert this back as soon as localize HP at production will dsisplay NewYork as NY
      city = this.getLocalizeCity();
    }
    info(`Choose suggestion with text: ${text} and type: ${type} and city: ${city}`);
    // TODO - temporary solution until localhost client has multi-search functionality and I add suggester's automation id back

    this.suggester.waitForExist(10000);
    const suggestions = this.getSuggestions();
    info(`suggestions: ${suggestions} - len: ${suggestions.length}`);
    if (suggestions.length === 0) {
      throw new Error(`0 suggestions collected upon search of: ${text}`);
    }
    let selectedSuggestion: SuggestionBlock;

    for (const suggestion of suggestions) {
      if (!type) {
        info(`suggestion text: ${suggestion.suggestionText.getText()}`);
        if (
          isMadlan()
            ? suggestion.suggestionText.getText().toLowerCase().includes(text.toLowerCase())
            : valueIncludesItemFromArray(
                replaceLocalizeSearchedStreetRepresentation(text.toString()),
                suggestion.suggestionText.getText().toLowerCase(),
              ) && city.includes(localizeAddressData(suggestion.suggestionText.getText(), 'city'))
        ) {
          selectedSuggestion = suggestion;
          break;
        }
      } else {
        info(
          `suggestion text: ${suggestion.suggestionText.getText()} -\
          type: ${suggestion.suggestionType.getText()}`,
        );
        if (
          isMadlan()
            ? suggestion.suggestionText.getText().toLowerCase().includes(text.toLowerCase()) &&
              suggestion.suggestionType.getText() === type
            : valueIncludesItemFromArray(
                replaceLocalizeSearchedStreetRepresentation(text),
                suggestion.suggestionText.getText().toLowerCase(),
              ) &&
              city.includes(localizeAddressData(suggestion.suggestionText.getText(), 'city')) &&
              suggestion.suggestionType.getText() === type
        ) {
          selectedSuggestion = suggestion;
          break;
        }
      }
    }
    if (selectedSuggestion) {
      const suggestionObj = {
        suggestionType: selectedSuggestion.suggestionType.isExisting()
          ? selectedSuggestion.suggestionType.getText()
          : { isSkip: true },
        suggestionText: selectedSuggestion.suggestionText.getText(),
        selectedNeighbourhood: selectedSuggestion.suggestionText.getText().split(',').shift(),
      };
      selectedSuggestion.waitAndClick();
      return suggestionObj;
    } else {
      throw new Error(`Suggester does not have text: ${text}`);
    }
  }

  chooseRandomSuggestion(): iSuggestionObject {
    let randIndex: number, suggestion: SuggestionBlock;
    const unwantedRand: number[] = [];
    let city: string[];
    if (!isMadlan()) {
      // TODO this code should be fixed as soon as prod decide how to work with additional cities
      // TODO revert this back as soon as localize HP at production will dsisplay NewYork as NY
      city = this.getLocalizeCity();
    }
    const suggestions = this.getSuggestions();
    info(`suggestions: ${suggestions} - len: ${suggestions.length}`);
    if (suggestions.length === 0) {
      throw new Error(`0 suggestions collected, exit test execution`);
    }
    if (isMadlan()) {
      randIndex = generateRandomNumber(suggestions.length - 1, 0);
      info(`Choose suggestion number ${randIndex}, text: ${suggestions[randIndex].getText()}`);
      suggestion = suggestions[randIndex];
    } else {
      do {
        randIndex = generateRandomNumber(suggestions.length - 1, 0, unwantedRand);
        info(`Choose suggestion number ${randIndex}, text: ${suggestions[randIndex].getText()}`);
        suggestion = suggestions[randIndex];
        unwantedRand.push(randIndex);
      } while (
        !city.includes(localizeAddressData(suggestion.suggestionText.getText(), 'city')) &&
        unwantedRand.length !== suggestions.length - 1
      );
      if (unwantedRand.length === suggestions.length - 1) {
        throw new Error(`No suggestion found with city ${city}`);
      }
    }
    info(`Choose suggestion number ${randIndex}, text: ${suggestions[randIndex].getText()}`);

    const suggestionObj = {
      suggestionType: suggestion.isExisting() ? suggestion.suggestionType.getText() : { isSkip: true },
      suggestionText: suggestion.suggestionText.getText(),
      selectedNeighbourhood: suggestion.suggestionText.getText().split(',').shift(),
    };

    suggestions[randIndex].click();
    return suggestionObj;
  }

  /**
   * Wait and return suggestions list
   * @returns {BaseElement[]}
   */
  getSuggestions(timeout: number = 10000): SuggestionBlock[] {
    this.firstSuggestion.optionalWaitForExist(1000, true);
    this.firstSuggestion.optionalWaitForExist(timeout);
    return this.suggestionElements;
  }

  // TODO find a proper way to close suggester as this one works wrong
  closeSuggester() {
    $('body').click();
  }

  mobileCloseSuggester() {
    this.closeOverlayButton.waitAndClick();
  }

  madlanSuggestionData(suggestion: SuggestionBlock, wantedData: string = 'city') {
    info(`selecting data of type: ${wantedData} from specific suggestion for madlan client`);
    const suggestionTextParts: string[] = suggestion.suggestionText.getText().split(',');
    info(`suggestionTextParts: ${suggestionTextParts}`);
    switch (wantedData) {
      case 'city':
        info(`suggestion city: ${suggestionTextParts[suggestionTextParts.length - 1].trim()}`);
        return suggestionTextParts[suggestionTextParts.length - 1].trim();
      case 'nghb':
      case 'street':
      case 'address':
      case 'project':
        info(`suggestion other: ${suggestionTextParts[0].trim()}`);
        return suggestionTextParts[0].trim();
      default:
        throw new Error(`provided incorrect suggestion part`);
    }
  }

  getSuggestionsTexts(timeout: number = 10000): string[] {
    const suggestionsTexts: string[] = [];
    const suggestions = this.getSuggestions(timeout);
    if (suggestions.length === 0) {
      return [];
    }
    suggestions.forEach((suggestion) => {
      suggestionsTexts.push(suggestion.suggestionText.getText());
    });
    info(`suggestionsTexts: ${suggestionsTexts} - count: ${suggestionsTexts.length}`);
    return suggestionsTexts;
  }

  getSuggestionsTypes(timeout: number = 10000): string[] {
    const suggestionsTypes: string[] = [];
    const suggestions = this.getSuggestions(timeout);
    if (suggestions.length === 0) {
      return [];
    }
    suggestions.forEach((suggestion) => {
      if (suggestion.suggestionType.optionalWaitForExist(3000)) {
        suggestionsTypes.push(suggestion.suggestionType.getText());
      } else {
        suggestionsTypes.push('');
      }
    });
    info(`suggestionsTypes: ${suggestionsTypes} - count: ${suggestionsTypes.length}`);
    return suggestionsTypes;
  }

  waitUntilSuggestionsRefreshed(
    suggestionsTextsBeforeSearch: string[],
    value: string | number,
    maxChecks: number = 10,
  ) {
    let suggestionsAfterSearch: string[], counter: number;
    info(`suggestionsBeforeSearch: ${suggestionsTextsBeforeSearch} - count: ${suggestionsTextsBeforeSearch.length}`);
    info(`starting to wait until suggestions are refreshed for maximum ${maxChecks} times of 1 sec time wait`);
    for (counter = 0; counter < maxChecks; counter++) {
      browser.pause(1000);
      suggestionsAfterSearch = this.getSuggestionsTexts(2000);
      info(
        `check ${counter} - suggestionsAfterSearch: ${suggestionsAfterSearch} - count: ${suggestionsAfterSearch.length}`,
      );
      if (suggestionsTextsBeforeSearch.length !== suggestionsAfterSearch.length) {
        if (
          itemFromArrayIncludedInSecondArray(
            suggestionsAfterSearch,
            replaceLocalizeSearchedStreetRepresentation(value.toString()),
          )
        ) {
          info(
            `check: ${counter}, number of suggestions before search is is not equal to the number of suggestions after search and searched value included in one of suggestions => suggestions refreshed`,
          );
          break;
        } else {
          warn(`Although number of suggestions changed but non of suggestions contains searched value ${value}`);
        }
      } else {
        info(
          `check ${counter} - firstSuggestionBeforeSearchText: ${suggestionsTextsBeforeSearch[0]} - firstSuggestionAfterSearchText: ${suggestionsAfterSearch[0]}`,
        );
        /*
        Added check for equal arrays as in case where number of suggestions before and after is equal
        and first suggestion is equal in both arrays we are never going to have
        sign that suggestions refreshed
        */
        if (!arraysEqual(suggestionsTextsBeforeSearch, suggestionsAfterSearch)) {
          if (
            itemFromArrayIncludedInSecondArray(
              suggestionsAfterSearch,
              replaceLocalizeSearchedStreetRepresentation(value.toString()),
            )
          ) {
            info(
              `check: ${counter}, text of first suggestion before search is not equal to the text of first suggestion after search and searched value included in one of suggestions => suggestions refreshed`,
            );
            break;
          } else {
            warn(`Although number of suggestions changed but non of suggestions contains searched value ${value}`);
          }
        } else {
          warn(
            `check ${counter} - text of first suggestion before search is equal to the text of first suggestion after search, continue to wait 1 sec and check again`,
          );
        }
      }
      if (counter === maxChecks) {
        throw new Error(`Suggestions are nor refreshed after full cycle of wait operation`);
      }
    }
  }

  getLocalizeCity() {
    const cities: string[] = [];
    if (params.city === LocalizeCities.NEWYORK) {
      cities.push(LocalizeCities.NEWYORK, 'NY');
    } else {
      cities.push(params.city);
    }
    return cities;
  }

  get suggestionElements() {
    return $$('[data-auto="autocomplete-suggestion"]').map((element) => new SuggestionBlock(element));
  }

  get closeOverlayButton() {
    return new BaseElement('close-button');
  }

  get firstSuggestion() {
    return new SuggestionBlock();
  }

  get suggester() {
    return new BaseElement('autocomplete-suggestions');
  }
}
