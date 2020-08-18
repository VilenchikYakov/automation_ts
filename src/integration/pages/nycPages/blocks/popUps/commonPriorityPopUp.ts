import BaseElement from '../../../baseElement';
import { generateRandomNumber } from '../../../../utils/generalUtils';
import { info } from '../../../../utils/logUtils';
import CommutePopUp from '../../../nycPages/blocks/popUps/commutePopUp';

export default class CommonPrioritiesPopUp extends BaseElement {
  readonly commutePopUp = new CommutePopUp();

  chooseSortButton(button: BaseElement): { buttonText: string; buttonSelector: string } {
    button.waitAndClick();
    return { buttonText: button.getText(), buttonSelector: button.selector };
  }

  /**
   * Click on random buttons from list buttons of sort
   * @param {number} amount, amount of buttons
   * @returns { buttonText: string, buttonSelector: string}[]
   */
  chooseRandomSortButtons(amount = 1): { buttonText: string; buttonSelector: string }[] {
    const resultButtonsData = [];
    const listElements = [
      this.lowCrimeButton,
      this.tranquilStreetButton,
      this.bikeFriendlyArea,
      this.goodLightButton,
      this.highlyRatedSchoolsButton,
      this.nearParksButton,
      this.nearDogParksButton,
    ];
    for (let i = 0; i < amount; i += 1) {
      const randIndex = generateRandomNumber(listElements.length - 1, 0);
      info(`Choose random priority button, selector: ${listElements[randIndex].selector}`);
      listElements[randIndex].waitAndClick();
      resultButtonsData.push({
        buttonText: listElements[randIndex].getText(),
        buttonSelector: listElements[randIndex].selector,
      });
      listElements.splice(randIndex, 1);
    }
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

  get commuteSort() {
    return new BaseElement('commute-sort-value');
  }
}
