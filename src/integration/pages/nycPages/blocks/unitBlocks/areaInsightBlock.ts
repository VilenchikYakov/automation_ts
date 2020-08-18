import BaseElement from '../../../baseElement';
import CommonHighlightBlock from './commonHighlightBlock';

export default class AreaInsightBlock extends BaseElement {
  constructor() {
    super('area_insights-block');
  }

  firstInsight() {
    if (this.firstGoodToKnowInsight || this.firstAboutToKnowInsight) {
      return this.firstGoodToKnowInsight || this.firstAboutToKnowInsight;
    } else {
      throw new Error('There is no insights, unable to continue with test');
    }
  }

  get goodToKnowCarousel() {
    return new BaseElement('good-to-know-carousel');
  }

  get goodToKnowInsights() {
    if (this.firstGoodToKnowInsight.optionalWaitForExist(10000)) {
      return this.goodToKnowCarousel
        .$$('[data-auto="area-insight"]')
        .map((element) => new CommonHighlightBlock(element));
    } else {
      return [];
    }
  }

  get aboutToComeCarousel() {
    return new BaseElement('about-to-come-carousel');
  }

  get aboutToKnowInsights() {
    if (this.firstAboutToKnowInsight.optionalWaitForExist(10000)) {
      return this.aboutToComeCarousel
        .$$('[data-auto="area-insight"]')
        .map((element) => new CommonHighlightBlock(element));
    } else {
      return [];
    }
  }

  get firstGoodToKnowInsight() {
    return new CommonHighlightBlock(this.goodToKnowCarousel.self.$('[data-auto="area-insight"]'));
  }
  get firstAboutToKnowInsight() {
    return new CommonHighlightBlock(this.aboutToComeCarousel.self.$('[data-auto="area-insight"]'));
  }
}
