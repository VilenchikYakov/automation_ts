import BaseElement from '../../../baseElement';

export default class CommonMobileUnitHeader extends BaseElement {
  goBack() {
    this.backButton.waitAndClick();
  }

  private get backButton() {
    return new BaseElement('[data-auto="sub-mobile-back-button"] a');
  }
}
