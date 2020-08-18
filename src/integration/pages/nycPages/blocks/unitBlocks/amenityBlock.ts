import BaseElement from '../../../baseElement';

export default class AmenityBlock extends BaseElement {
  constructor(amenityElement?: string | WebdriverIO.Element) {
    super(amenityElement ? amenityElement : 'amenity-wrapper');
  }

  get amenityText() {
    return new BaseElement('amenity-text');
  }
}
