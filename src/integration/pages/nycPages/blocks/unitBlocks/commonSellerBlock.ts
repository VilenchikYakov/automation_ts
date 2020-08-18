import BaseElement from '../../../baseElement';

export default class CommonSellerBlock extends BaseElement {
  constructor() {
    super('agent-details-container');
  }

  openContactSellerPopup() {
    this.contactSellerButtonText.scrollIntoView({ block: 'center' });
    this.contactSellerButtonText.waitAndClick();
  }

  get contactSellerButton() {
    return new BaseElement('agent-contact-button');
  }

  get contactSellerButtonText() {
    return new BaseElement('agent-contact-button-text');
  }

  get agentName() {
    return new BaseElement('agent-name');
  }

  get agencyName() {
    return new BaseElement('agent-agency');
  }
}
