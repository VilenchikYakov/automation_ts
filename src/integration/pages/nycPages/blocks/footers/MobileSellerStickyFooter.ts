import BaseElement from '../../../baseElement';
import SellerStickyFooter from '../../../commonPages/blocks/footers/SellerStickyFooter';

export default class MobileSellerStickyFooter extends SellerStickyFooter {
  saveFavorite() {
    this.saveFavoriteButton.waitAndClick();
  }

  get saveFavoriteButton() {
    return new BaseElement('bulletin-favorite-button');
  }
}
