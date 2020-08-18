import CommonHeader from './commonHeader';
import BaseElement from '../../../baseElement';

export default class MobileHeader extends CommonHeader {
  constructor() {
    super('mobile-header-wrapper');
  }

  goBack() {
    this.backButton.waitAndClick();
  }

  private get backButton() {
    return new BaseElement('back-button');
  }
}
