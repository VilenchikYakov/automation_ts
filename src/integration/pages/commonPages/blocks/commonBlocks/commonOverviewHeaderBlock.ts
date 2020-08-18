import BaseElement from '../../../baseElement';
import CommonOfferBlock from './commonOfferBlock';

export default class CommonOverviewHeaderBlock extends BaseElement {
  readonly offerBlock = new CommonOfferBlock();
  constructor() {
    super('Overview/header-block');
  }
}
