import BasePage from '../basePage';
import BaseElement from '../baseElement';
import { iOpenParams } from '../../interfaces';

export default class CommonUnitPage extends BasePage {
  open(openParams: iOpenParams) {
    openParams.urlSuffix = openParams.urlSuffix.startsWith('/listings/')
      ? openParams.urlSuffix
      : '/listings/' + openParams.urlSuffix;
    super.open(openParams);
  }

  getPercentMatchLabel() {
    this.matchLabel.waitForDisplayed();
    return this.matchLabel.getText().match(/\d+/g)[0];
  }

  getFullAddressString(): string {
    const primaryAddress = this.primaryAddressText;
    const secondaryAddressArray = this.secondaryAddressText.split(',');
    secondaryAddressArray.pop();
    const secondaryAddress = secondaryAddressArray.join(',');
    return `${primaryAddress}, ${secondaryAddress}`;
  }

  get primaryAddress() {
    return new BaseElement('primary_address_text');
  }

  get primaryAddressText() {
    return this.primaryAddress.getText();
  }

  get secondaryAddress() {
    return new BaseElement('secondary_address_text');
  }

  get secondaryAddressText() {
    return this.secondaryAddress.getText();
  }

  get matchLabel() {
    return new BaseElement('match-label');
  }
}
