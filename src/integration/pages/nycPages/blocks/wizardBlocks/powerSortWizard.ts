import { info } from '../../../../utils/logUtils';
import { generateRandomNumber, getRandomBoolean } from '../../../../utils/generalUtils';
import BaseElement from '../../../baseElement';
import CommonWizard from '../../../commonPages/blocks/wizardBlock/commonWizard';

export default class PowerSortWizard extends CommonWizard {
  /**
   * Click on random sort buttons or click on skip button
   * @param {number} amount, amount of clicked buttons
   * @returns { isSkip: true } | { buttonText: string, buttonSelector: string }[]
   */
  skipOrSetSort(amount = 1): any {
    if (getRandomBoolean()) {
      info('Skip set sort in PowerSortWizard');
      this.skipButton.waitAndClick();
      return { isSkip: true };
    }
    return this.chooseRandomSortButtons(amount);
  }

  /**
   * Click on random buttons from list buttons of sort
   * @param {number} amount, amount of buttons
   * @returns { buttonText: string, buttonSelector: string}[]
   */
  chooseRandomSortButtons(amount = 1): { buttonText: string; buttonSelector: string }[] {
    const listElements = [
      this.tranquilStreetButton,
      this.goodLightButton,
      this.lowCrimeButton,
      this.nearParksButton,
      this.highlyRatedSchoolsButton,
      this.nearDogParksButton,
      this.bikeFriendlyArea,
    ];
    let resultButtonsData = [];
    for (let i = 0; i < amount; i += 1) {
      const randIndex = generateRandomNumber(listElements.length - 1, 0);
      info(`Choose random button, selector: ${listElements[randIndex].selector}`);

      listElements[randIndex].waitAndClick();
      resultButtonsData.push({
        buttonText: listElements[randIndex].getText(),
        buttonSelector: listElements[randIndex].selector,
      });
      listElements.splice(randIndex, 1);
    }
    this.nextButton.waitAndClick();
    return resultButtonsData;
  }

  get tranquilStreetButton() {
    return new BaseElement('quietStreet-sort-value');
  }

  get goodLightButton() {
    return new BaseElement('naturalLight-sort-value');
  }

  get lowCrimeButton() {
    return new BaseElement('safety-sort-value');
  }

  get nearParksButton() {
    return new BaseElement('parkAccess-sort-value');
  }

  get highlyRatedSchoolsButton() {
    return new BaseElement('bestSchool-sort-value');
  }

  get nearDogParksButton() {
    return new BaseElement('dogPark-sort-value');
  }

  get bikeFriendlyArea() {
    return new BaseElement('bikeFriendly-sort-value');
  }
}
