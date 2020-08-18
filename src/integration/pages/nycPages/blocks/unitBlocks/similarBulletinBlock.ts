// import BaseElement from '../baseElement';
// import CommonBulletinBlock from './blocks/listingBlocks/commonBulletinBlock';
import BasePage from '../../../basePage';
import BaseElement from '../../../baseElement';
import CommonBulletinBlock from '../../../commonPages/blocks/listingBlocks/commonBulletinBlock';

export default class SimilarBulletinBlock extends CommonBulletinBlock {
  constructor(similarBulletin?: string | WebdriverIO.Element) {
    super(similarBulletin ? similarBulletin : 'similar-listing-card');
  }

  get similarBulletinLink() {
    return new BaseElement('similar-listing-link');
  }
}
