import BaseElement from '../../../baseElement';

export default class PricesBlock extends BaseElement {
  constructor() {
    super('Prices-block');
  }

  scrollToPricesChart() {
    this.pricesChartWrapper.scrollIntoView({ block: 'center' });
  }

  get trends() {
    return new BaseElement('Trends-block');
  }

  get pricesChartWrapper() {
    return new BaseElement('price-chart-wrapper', this.trends.self);
  }
}
