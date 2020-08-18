import OverviewHeaderBlock from '../../../commonPages/blocks/unitBlocks/overviewHeaderBlock';
import BaseElement from '../../../baseElement';

export default class MobileOverviewHeaderBlock extends OverviewHeaderBlock {
  goBack() {
    this.backLink.waitAndClick();
  }

  get backLink() {
    return new BaseElement('back-link', this.self);
  }
}
