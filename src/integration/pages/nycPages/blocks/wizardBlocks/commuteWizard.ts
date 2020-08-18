import { info } from '../../../../utils/logUtils';
import { getRandomBoolean, getRandomItemOutOfArray } from '../../../../utils/generalUtils';
import BaseElement from '../../../baseElement';
import SearchInput from '../../../elements/searchInput';
import CommonCommuteHPWizard from '../../../commonPages/blocks/wizardBlock/commonCommuteHPWizard';

export default class CommuteWizard extends CommonCommuteHPWizard {
  /**
   * Set commute data or click on skip button
   * @param {string} value for setting
   * @returns { isSkip: boolean }
   * | { commuteSelector: string, suggestObj: { suggestionType: string | { isSkip: boolean }, suggestionText: string }}
   */
  skipOrSetCommute(value: string): any {
    if (getRandomBoolean()) {
      info('Skip set address in CommuteWizard');
      this.skipButton.waitAndClick();
      return { isSkip: true };
    }
    const commuteSelector = this.chooseRandomCommute();
    const suggestObj = this.chooseRandomGoingTo(value);
    return { commuteSelector, suggestObj };
  }

  /**
   * Set commute address
   * @param {string} value for setting
   * @returns { suggestionType: string | { isSkip: boolean }, suggestionText: string }
   */
  chooseRandomGoingTo(value: string): { suggestionType: string | { isSkip: boolean }; suggestionText: string } {
    const suggestObj = this.goingToSearchInput.setValueAndChooseRandomSuggestion(value);
    this.nextButton.click();
    return suggestObj;
  }

  /**
   * Click on random commute type button
   * @returns {string} selector of commute button
   */
  chooseRandomCommute(): string {
    const listElements = [this.transitButton, this.carButton, this.bikeButton, this.walkButton];
    const chosenCommute = getRandomItemOutOfArray(listElements);

    getRandomItemOutOfArray(listElements).waitAndClick();
    info(`Choose random transport button: ${chosenCommute.selector}`);
    return chosenCommute.selector;
  }

  chooseCommute() {
    this.transitButton.waitAndClick();
  }

  chooseBike() {
    this.bikeButton.waitAndClick();
  }

  // TODO - remove this function as soon as HP tests are refactored
  skipOrSetCommuteB1E3(value: string): any {
    if (getRandomBoolean()) {
      info('Skip set address in CommuteWizard');
      return { isSkip: true };
    }
    const commuteSelector = this.chooseRandomCommute();
    const suggestObj = this.chooseRandomGoingToB1E3(value);
    return { commuteSelector, suggestObj };
  }

  // TODO - remove this function as soon as HP tests are refactored
  chooseRandomGoingToB1E3(value: string): { suggestionType: string | { isSkip: boolean }; suggestionText: string } {
    return this.goingToSearchInput.setValueAndChooseRandomSuggestion(value, true);
  }

  get transitButton() {
    return new BaseElement('commute-circle-button-commute');
  }

  get bikeButton() {
    return new BaseElement('commute-circle-button-bike');
  }

  get goingToSearchInput() {
    return new SearchInput(this.selector);
  }

  get submitButton() {
    return new BaseElement('submit-button');
  }
}
