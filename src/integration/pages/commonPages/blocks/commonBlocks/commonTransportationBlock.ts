import BaseElement from '../../../baseElement';

export default class CommonTransportationBlock extends BaseElement {
  constructor() {
    super('Transportation-block');
  }

  get transportationInsights() {
    return new BaseElement('bulletin-images');
  }
}
