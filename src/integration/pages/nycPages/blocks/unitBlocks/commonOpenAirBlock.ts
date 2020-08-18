import BaseElement from '../../../baseElement';
import YelpBlock from '../commonBlocks/yelpBlock';

export default class CommonOpenAirBlock extends BaseElement {
  constructor() {
    super('OpenAir-block');
  }

  get yelpBlocks() {
    this.firstYelpBlock.optionalWaitForExist(10000);
    return $$('[data-auto="card-info"]').map((element) => new YelpBlock(element));
  }

  get firstYelpBlock() {
    return new YelpBlock();
  }
}
