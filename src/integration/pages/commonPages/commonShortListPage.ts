import BasePage from '../basePage';
import BaseElement from '../baseElement';
import CommonBulletinBlock from './blocks/listingBlocks/commonBulletinBlock';

export default class CommonShortListPage extends BasePage {
  open() {
    super.open({ urlSuffix: '/shortlist' });
  }

  savedListingsData(): string[] {
    return this.savedListingList.map((item) => item.bulletinDetails.bulletinAddress.getText());
  }

  deleteSavedListings() {
    this.savedListingList.map((item) => item.favoriteButton.waitAndClick());
  }

  get savedListingList() {
    this.savedFirstListing.optionalWaitForExist(10000);
    return $$('[data-auto="saved-listing"]').map((element) => new CommonBulletinBlock(element));
  }

  get lastContactContainer() {
    return new BaseElement('last-contact-container');
  }

  get savedListingsContainer() {
    return new BaseElement('saved-listings-container');
  }

  get savedFirstListing() {
    return new BaseElement('saved-listing');
  }
}
