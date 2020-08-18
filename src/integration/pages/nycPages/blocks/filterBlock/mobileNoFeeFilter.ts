import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';
import BaseElement from '../../../baseElement';

export default class MobileNoFeeFilter extends CommonFilterPopUp {
  constructor() {
    super('noFeeFilter');
  }

  setFilter() {
    this.mobileCheckBox.waitAndClick();
    this.applyPopUp();
  }

  get mobileCheckBox() {
    return new BaseElement('checkmark', this.self);
  }
}
