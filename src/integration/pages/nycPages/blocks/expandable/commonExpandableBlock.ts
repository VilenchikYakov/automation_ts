import BaseElement from '../../../baseElement';
import { info, warn } from '../../../../utils/logUtils';
import { automationTags } from '../../../../data/webElementData';
import waitUtils from '../../../../utils/waitUtils';

export default class CommonExpandableBlock extends BaseElement {
  constructor(elementString: string) {
    super(elementString);
  }

  expandBlock() {
    info(`Expand expandable insight of type ${this.selector}`);
    this.waitForDisplayed(5000);
    this.scrollIntoView({ block: 'center' });
    if (this.collapseArrow.waitForDisplayed(10000)) {
      waitUtils.waitElementVisible(this.collapseArrow.selector);
      this.collapseArrow.waitAndClick();
    }
  }

  get collapseArrow() {
    return new BaseElement('collapse-arrow', this.self);
  }
}
