import BaseElement from '../../../baseElement';
import { info, warn } from '../../../../utils/logUtils';

export default class PwaPopUp extends BaseElement {
  constructor() {
    super('pwa-popup-wrapper');
  }

  closePopUp() {
    this.closePopupElement.waitAndClick();
  }

  waitClosePopUp() {
    if (this.optionalWaitForExist(10000)) {
      this.closePopUp();
      this.waitForExist(1000, true);
      // On android device after we close big pwa popup small one immediatelly opened on the top of the page
      // and need to be closed
      if (driver.isAndroid) {
        this.closePopUp();
        this.waitForExist(1000, true);
      }
    } else {
      info(`modalPopup didn't show`);
    }
  }

  get closePopupElement() {
    return new BaseElement('pwa-popup-close');
  }

  get buttons() {
    return new BaseElement('pwa-popup-buttons');
  }

  get buttonsList() {
    return this.$$('[data-auto="pwa-popup-button-wrapper"]').map((element) => new BaseElement(element));
  }
}
