import CommonModalPopUp from './commonModalPopUp';
import BaseElement from '../../../baseElement';

export default class AfterWizardPopUp extends CommonModalPopUp {
  openSignUpPopUp() {
    this.enterEmailButton.waitAndClick();
  }

  get enterEmailButton() {
    return new BaseElement('after-wizard-popup-button');
  }
}
