import BaseElement from '../../../baseElement';
import CommonAmenitiesBlock from './commonAmenitiesBlock';
import FeaturedAmenitiesBlock from './featuredAmenitiesBlock';

export default class AmenitiesBlock extends BaseElement {
  readonly commonAmenities = new CommonAmenitiesBlock();
  readonly featuredAmenities = new FeaturedAmenitiesBlock();

  constructor() {
    super('amenities-block');
  }
}
