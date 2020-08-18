import BaseElement from '../../../baseElement';

export default class BulletinDetailsBlock extends BaseElement {
  constructor(parentEl: WebdriverIO.Element) {
    super('property-details', parentEl);
  }

  get bulletinPrice() {
    return new BaseElement('property-price', this.self);
  }

  get bulletinDetails() {
    return new BaseElement('property-price-size-type', this.self);
  }

  get bulletinRooms() {
    return new BaseElement('property-rooms', this.self);
  }

  get bulletinSize() {
    return new BaseElement('property-size', this.self);
  }

  get bulletinClass() {
    return new BaseElement('property-class', this.self);
  }

  get bulletinAddress() {
    return new BaseElement('property-address', this.self);
  }
}
