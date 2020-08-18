import CommonModalPopUp from '../../../commonPages/blocks/popUps/commonModalPopUp';
import BaseElement from '../../../baseElement';

export default class commonSuccessPopUp extends CommonModalPopUp {
  get doneIcon() {
    return new BaseElement('done-icon');
  }
}
