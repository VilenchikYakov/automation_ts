import BasePage from '../basePage';
import BaseElement from '../baseElement';
import SavedAddressCard from './blocks/savedAddressCard';

export default class FollowPage extends BasePage {
  constructor() {
    super();
  }
  deleteAllCards() {
    this.savedCardList.forEach((card) => {
      card.deleteSearch.waitAndClick();
      card.confirmDelete.waitAndClick();
    });
  }

  get savedCardList() {
    this.firstSavedCard.optionalWaitForExist(10000);
    return $$('[data-auto="saved-address-card"]').map((element) => new SavedAddressCard(element));
  }
  get emptyState() {
    return new BaseElement('saved-address-empty-state');
  }

  get firstSavedCard() {
    return new SavedAddressCard();
  }
}
