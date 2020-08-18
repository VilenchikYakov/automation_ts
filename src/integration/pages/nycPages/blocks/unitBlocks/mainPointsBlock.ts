import BaseElement from '../../../baseElement';

export default class MainPointsBlock extends BaseElement {
  constructor() {
    super('main-points');
  }

  get mainPointsList() {
    return new BaseElement('verified-items-list');
  }

  get verifiedItems() {
    return this.mainPointsList.$$('[data-auto="verified-insight"]');
  }
}
