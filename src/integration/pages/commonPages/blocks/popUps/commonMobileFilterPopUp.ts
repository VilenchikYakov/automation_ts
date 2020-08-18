import CommonFilterPopUp from './commonFilterPopUp';
import BaseElement from '../../../baseElement';
import CommonPriceRangeFilter from '../filterBlock/commonPriceRangeFilter';
import CommonRoomsRangeFilter from '../filterBlock/commonRoomsFilter';
import CommonAreaRangeFilter from '../filterBlock/commonAreaRangeFilter';

export default class CommonMobileFilterPopUp extends CommonFilterPopUp {
  readonly anyPrice = new CommonPriceRangeFilter();
  readonly roomsRange = new CommonRoomsRangeFilter();
  readonly areaRange = new CommonAreaRangeFilter();

  constructor() {
    super('mobile-filter-popup');
  }
  getPriceText(): string {
    this.priceLabel.waitForDisplayed(10000);
    return this.priceLabel.getText();
  }

  get priceLabel() {
    return new BaseElement('priceRange');
  }
}
