import BaseElement from '../../../baseElement';

export default class MobileAddressHeader extends BaseElement {
  goBack() {
    this.backButton.waitAndClick();
  }

  followAddress() {
    this.followButton.waitAndClick();
  }

  private get backButton() {
    return new BaseElement('[data-auto="sub-mobile-back-button"] a');
  }

  get followButton() {
    return new BaseElement('header-follow-button');
  }
}
