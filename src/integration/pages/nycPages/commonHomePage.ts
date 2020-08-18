import BasePage from '../basePage';
import CommuteWizard from './blocks/wizardBlocks/commuteWizard';
import DealTypeWizard from './blocks/wizardBlocks/dealTypeWizard';
import PowerSortWizard from './blocks/wizardBlocks/powerSortWizard';
import FilterWizard from './blocks/wizardBlocks/filterWizard';
import BaseElement from '../baseElement';
import { info, warn } from '../../utils/logUtils';
import { iButton } from '../../interfaces';
import { getRandomItemOutOfArray } from '../../utils/generalUtils';
import SearchInput from '../elements/searchInput';

export default class CommonHomePage extends BasePage {
  readonly dealTypeWizard = new DealTypeWizard();
  readonly powerSortWizard = new PowerSortWizard();
  readonly commuteWizard = new CommuteWizard();
  readonly filterWizard = new FilterWizard();

  /**
   * Click on random deal type button
   * @returns { buttonText: string, buttonSelector: string }
   */
  clickOnRandomButton(): iButton {
    const listElements = [this.hpBuyButton, this.hpRentButton];
    const chosenButton = getRandomItemOutOfArray(listElements);

    chosenButton.waitForDisplayed(10000);
    const buttonData = {
      buttonText: chosenButton.getText(),
      buttonSelector: chosenButton.selector,
    };

    info(`Choose random deal button: '${JSON.stringify(buttonData)}'`);
    chosenButton.waitAndClick();
    return buttonData;
  }

  selectCheckAddress() {
    this.hpCheckAddressButton.waitAndClick();
  }

  get hpBuyButton() {
    return new BaseElement('hp-buy-button');
  }

  get hpRentButton() {
    return new BaseElement('hp-rent-button');
  }

  get hpCheckAddressButton() {
    return new BaseElement('hp-checkAddress-button');
  }

  get searchInput() {
    return new SearchInput(this.parentElement.selector);
  }

  get parentElement() {
    return new BaseElement('desktop-home-body');
  }
}
