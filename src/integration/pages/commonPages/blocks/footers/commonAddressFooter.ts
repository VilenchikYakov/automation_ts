import BaseElement from '../../../baseElement';

export default class CommonAddressFooter extends BaseElement {
  followAddress() {
    this.followAddressButton.waitAndClick();
  }

  get followAddressButton() {
    return new BaseElement('address-page-button-sticky-text');
  }
}
