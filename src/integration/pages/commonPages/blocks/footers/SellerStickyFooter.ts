import BaseElement from '../../../baseElement';

export default class SellerStickFooter extends BaseElement {
  constructor() {
    super('agent-sticky-footer');
  }

  clickContactSellerButton() {
    this.contactSellerButtonText.waitAndClick();
  }

  get contactSellerButtonText() {
    return new BaseElement('agent-contact-button-sticky-text');
  }
}
