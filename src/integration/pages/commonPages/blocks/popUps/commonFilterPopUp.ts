import BaseElement from '../../../baseElement';

export default class CommonFilterPopUp extends BaseElement {
  applyPopUp() {
    this.applyButton.waitAndClick();
  }

  clearPopUp() {
    this.clearButton.waitAndClick();
  }

  get clearButton() {
    return new BaseElement('filterClearButton');
  }

  get applyButton() {
    return new BaseElement('filterSubmitButton');
  }
}
