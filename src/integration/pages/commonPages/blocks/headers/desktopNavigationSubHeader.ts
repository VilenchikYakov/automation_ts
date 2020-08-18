import CommonNavigationSubHeader from './commonNavigationSubHeader';
import BaseElement from '../../../baseElement';

export default class DesktopNavigationSubHeader extends CommonNavigationSubHeader {
  back() {
    return this.backButton.waitAndClick();
  }

  private get backButton() {
    return new BaseElement('[data-auto="sub-menu-back-button"] a');
  }
}
