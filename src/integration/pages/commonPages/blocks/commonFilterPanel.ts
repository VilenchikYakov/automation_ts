import BaseElement from '../../baseElement';
import SearchInput from '../../elements/searchInput';

export default class CommonFilterPanel extends BaseElement {
  /**
   * Open mobile/desktop Priority filter pop up
   */
  openPriorityPopUp() {
    this.priorityFilterButton.waitAndClick();
  }

  get addressSearchInput() {
    return new SearchInput();
  }

  get priorityFilterButton() {
    return new BaseElement('priorities-button');
  }
}
