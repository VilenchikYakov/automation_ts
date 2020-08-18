import BaseElement from '../../../baseElement';
import AmenityBlock from './amenityBlock';

export default class CommonAmenitiesBlock extends BaseElement {
  constructor() {
    super('common-amenities');
  }

  get commonAmenities() {
    if (this.firstAmenity.optionalWaitForExist(10000)) {
      return $$('[data-auto="amenity-wrapper"]').map((element) => new AmenityBlock(element));
    }
  }

  get firstAmenity() {
    return new AmenityBlock();
  }
}
