import BaseElement from '../../../baseElement';
import CommonInsightBlock from './commonInsightBlock';
import CommonProsAndConsBlock from '../../../commonPages/blocks/commonBlocks/commonProsAndConsBlock';
import VerifiedInsightsBlock from './verifiedInsightsBlock';

export default class ProsAndConsBlock extends CommonProsAndConsBlock {
  readonly commonInsightBlock = new CommonInsightBlock();
  readonly verifiedInsights = new VerifiedInsightsBlock();

  getUpdateFromInsight() {
    this.lastCardButton.scrollIntoView({ block: 'center' });
    this.lastCardButton.waitAndClick();
  }

  getUpdateWithoutInsights() {
    this.emptyCardButton.scrollIntoView({ block: 'center' });
    this.emptyCardButton.waitAndClick();
  }

  get emptyCardButton() {
    return new BaseElement('empty-card-button');
  }

  get lastCardButton() {
    return new BaseElement('last-card-button');
  }

  get insightCards() {
    this.firstInsight.optionalWaitForExist(10000);
    return $$('[data-auto="insight-card-wrapper-outer"]').map((element) => new BaseElement(element));
  }

  get firstInsight() {
    return new BaseElement('insight-card-wrapper-outer');
  }
}
