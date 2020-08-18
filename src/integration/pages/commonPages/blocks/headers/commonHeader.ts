import { generateRandomNumber } from '../../../../utils/generalUtils';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';
import { iButton } from '../../../../interfaces';
import CitySelectionPopUp from '../popUps/citySelectionPopUp';

export default class CommonHeader extends BaseElement {
  readonly citySelectionPopUp = new CitySelectionPopUp();
  /**
   * Click on random deal type button
   * @returns { buttonText: string, buttonSelector: string }
   */
  clickOnRandomDealTypeButton(): iButton {
    const listElements = [this.buyButton, this.rentButton];
    const randIndex = generateRandomNumber(listElements.length - 1, 0);

    listElements[randIndex].waitForDisplayed();
    const buttonData = {
      buttonText: listElements[randIndex].getText(),
      buttonSelector: listElements[randIndex].selector,
    };
    info(`Choose random deal button: '${buttonData.buttonText}'`);
    listElements[randIndex].click();
    return buttonData;
  }

  clickBuyToggle() {
    this.buyButton.waitAndClick();
  }

  clickRentToggle() {
    this.rentButton.waitAndClick();
  }

  clickCheckToggle() {
    this.checkAddressButton.waitAndClick();
  }

  goHomePage() {
    this.mainLogo.waitAndClick();
  }

  openMorePopUp() {
    this.moreButton.waitAndClick();
  }
  getActiveDealButton() {
    this.activeDealButton.waitForDisplayed(10000);
    return this.activeDealButton;
  }

  openCitySelection() {
    this.citySelection.waitAndClick();
  }

  get mainLogo() {
    return new BaseElement('main-logo-link');
  }

  get moreButton() {
    return new BaseElement('more-button');
  }

  get buyButton() {
    return new BaseElement('[data-auto="search-toggle"][data-auto-toggle-type="buy"]');
  }

  get rentButton() {
    return new BaseElement('[data-auto="search-toggle"][data-auto-toggle-type="rent"]');
  }

  get checkAddressButton() {
    return new BaseElement('[data-auto="search-toggle"][data-auto-toggle-type="check"]');
  }

  get activeDealButton() {
    return new BaseElement('[data-auto="search-toggle"][data-auto-active="true"]');
  }

  get citySelection() {
    return new BaseElement('city-selection');
  }

  get searchModeSelection() {
    return new BaseElement('search-mode-selection');
  }
}
