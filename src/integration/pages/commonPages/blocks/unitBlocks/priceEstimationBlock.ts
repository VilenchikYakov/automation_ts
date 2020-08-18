import BaseElement from '../../../baseElement';

export default class PriceEstimationBlock extends BaseElement {
  constructor() {
    super('PricesEstimation-block');
  }

  get soldListingsTable() {
    return new BaseElement('sold-listings-table');
  }
}
