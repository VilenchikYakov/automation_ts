import CommonFilterPanel from './commonFilterPanel';
import BaseElement from '../../baseElement';
import MobilePriorityPopUp from './popUps/commonMobilePriorityPopUp';

export default class CommonMobileFilterPanel extends CommonFilterPanel {
  readonly mobilePriorityPopUp = new MobilePriorityPopUp();

  /**
   * Open mobile filter pop up
   */
  openFilterPopUp() {
    this.mobileFilterButton.waitAndClick();
  }

  get mobileFilterButton() {
    // return new BaseElement('[data-auto="filtersRoot"] [data-auto="filtersButton"]');
    return new BaseElement('filtersButton');
  }
}
