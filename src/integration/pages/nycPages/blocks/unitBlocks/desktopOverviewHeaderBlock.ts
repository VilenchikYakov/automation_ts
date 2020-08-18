import OverviewHeaderBlock from '../../../commonPages/blocks/unitBlocks/overviewHeaderBlock';
import BaseElement from '../../../baseElement';

export default class DesktopOverviewHeaderBlock extends OverviewHeaderBlock {
  saveSearch() {
    this.unitFavoriteButton.waitAndClick();
  }

  get unitFavoriteButton() {
    return new BaseElement('bulletin-favorite-button');
  }
}
