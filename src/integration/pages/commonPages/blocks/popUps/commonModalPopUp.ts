import BaseElement from '../../../baseElement';
import { info } from '../../../../utils/logUtils';

/**
 * Common modal pop up, use for extends
 */
export default class CommonModalPopUp extends BaseElement {
  constructor() {
    super('modal-popup');
  }

  closePopUp() {
    this.closeButton.waitAndClick();
  }

  waitClosePopUp() {
    if (this.optionalWaitForExist(10000)) {
      if (this.closeButton.optionalWaitForDisplayed(5000)) {
        this.closePopUp();
      }
      this.waitForExist(1000, true);
    } else {
      info(`modalPopup didn't show`);
    }
  }

  get closeButton() {
    return new BaseElement('modal-close-button', this.self);
  }

  get title() {
    return new BaseElement('modal-title', this.self);
  }
}
