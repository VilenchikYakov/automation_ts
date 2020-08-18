import BaseElement from '../../../baseElement';
import { automationTags } from '../../../../data/webElementData';

export default class CommonHighlightBlock extends BaseElement {
  constructor(areaInsight?: string | WebdriverIO.Element) {
    super(areaInsight ? areaInsight : 'area-insight');
  }

  readMore() {
    this.readMoreLink.waitAndClick();
  }

  getInsightType(): string {
    return this.getAttribute(automationTags.dataAutoInsightType);
  }

  get readMoreLink() {
    return new BaseElement('area-read-more-link', this.self);
  }
}
