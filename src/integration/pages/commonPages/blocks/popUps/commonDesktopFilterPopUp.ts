import CommonFilterPopUp from './commonFilterPopUp';
import BaseElement from '../../../baseElement';

export default class CommonDesktopFilterPopUp extends CommonFilterPopUp {
  constructor() {
    super('filters-container');
  }

  getTitle(): string {
    this.title.waitForDisplayed(10000);
    return this.title.getText();
  }

  titleText() {
    return this.title.getText();
  }

  get title() {
    return new BaseElement('filterPopupTitle');
  }
}
