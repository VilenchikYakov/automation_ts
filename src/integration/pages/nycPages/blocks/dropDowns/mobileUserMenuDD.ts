import BaseElement from '../../../baseElement';
import CommonMobileUserMenuDD from '../../../commonPages/blocks/dropDowns/commonMobileUserMenuDD';

export default class MobileUserMenuDD extends CommonMobileUserMenuDD {
  openSavedAddresses() {
    this.savedAddresses.waitAndClick();
  }

  private get savedAddresses() {
    return new BaseElement('[data-auto="action-my-addresses"] a');
  }

  private get savedSearches() {
    return new BaseElement('[data-auto="action-my-search"] a');
  }

  private get myNeeds() {
    return new BaseElement('[data-auto="action-my-needs"] a');
  }

  private get commute() {
    return new BaseElement('[data-auto="action-commute"] a');
  }
}
