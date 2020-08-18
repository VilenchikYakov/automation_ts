import BaseElement from '../../../baseElement';

export default class MyHomePopUp extends BaseElement {
  goBack() {
    this.backButton.waitAndClick();
  }

  private get backButton() {
    return new BaseElement('back-button');
  }
}
