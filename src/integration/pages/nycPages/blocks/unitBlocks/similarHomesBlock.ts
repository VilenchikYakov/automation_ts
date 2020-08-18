import BaseElement from '../../../baseElement';
import SimilarBulletinBlock from './similarBulletinBlock';

export default class SimilarHomesBlock extends BaseElement {
  constructor() {
    super('SimilarHomes-block');
  }

  get similarBulletinsList() {
    this.firstSimilarBulletin.optionalWaitForExist(10000);
    return $$('[data-auto="similar-listing-card"]').map((element) => new SimilarBulletinBlock(element));
  }

  get firstSimilarBulletin() {
    return new SimilarBulletinBlock();
  }
}
