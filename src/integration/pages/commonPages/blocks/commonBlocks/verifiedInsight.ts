import BaseElement from '../../../baseElement';

export default class VerifiedInsight extends BaseElement {
  constructor(verifiedInsightElement?: string | WebdriverIO.Element) {
    super(verifiedInsightElement ? verifiedInsightElement : 'verified-insight');
  }

  insightTypesList(): string[] {
    const divs = this.self.$$('div');
    return divs.map((item) => item.getAttribute('type'));
  }
}
