import BaseElement from '../../../baseElement';

export default class PlanningBlock extends BaseElement {
  constructor() {
    super('Planning-block');
  }

  get constructionDetails() {
    return new BaseElement('construction-details', this.selector);
  }

  get constructionInsights() {
    return new BaseElement('bulletin-images', this.selector);
  }
}
