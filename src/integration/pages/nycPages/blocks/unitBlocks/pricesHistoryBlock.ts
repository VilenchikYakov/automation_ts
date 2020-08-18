import BaseElement from '../../../baseElement';
export default class PricesHistoryBlock extends BaseElement {
  constructor() {
    super('prices-history');
  }

  get soldListingsTable() {
    return new BaseElement('sold-listings-table');
  }
}
