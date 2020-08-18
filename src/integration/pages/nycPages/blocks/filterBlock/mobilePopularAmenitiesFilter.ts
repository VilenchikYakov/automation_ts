import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';
import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';

export default class MobilePopularAmenitiesFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-popularAmenities');
  }

  setFilter(values: Array<string>) {
    info(`Setting amenities filter using ${values} selectors`);
    values.forEach((value) => {
      new BaseElement(`[data-auto-amenities-item-root-value="${value}"]`).waitAndClick();
    });
    this.applyPopUp();
  }
}
