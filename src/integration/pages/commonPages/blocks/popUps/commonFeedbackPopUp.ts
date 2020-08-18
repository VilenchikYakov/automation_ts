import CommonModalPopUp from '../../../commonPages/blocks/popUps/commonModalPopUp';
import BaseElement from '../../../baseElement';

export default class CommonFeedbackPopUp extends CommonModalPopUp {
  sendFeedback(message: string, email: string) {
    this.waitForDisplayed();
    this.firstOption.click();
    this.messageInput.setValue(message);
    this.emailInput.setValue(email);
    this.createButton.waitAndClick();
  }

  private get messageInput() {
    return new BaseElement('[data-auto="textfield-text-area"][name="commentMessage"]');
  }
  private get createButton() {
    return new BaseElement('[data-auto="modal-footer"] button');
  }
  get firstOption() {
    return new BaseElement('radio-button');
  }
  get emailInput() {
    return new BaseElement('[data-auto="textfield-input"][name=userEmail]');
  }
}
