import BaseElement from '../../../baseElement';

export default class CommonOfferBlock extends BaseElement {
  constructor() {
    super('offer-details');
  }

  get bedsCount() {
    return new BaseElement('beds-count');
  }

  get floor() {
    return new BaseElement('floor');
  }

  get area() {
    return new BaseElement('area');
  }

  get buildingClass() {
    return new BaseElement('building-class');
  }
}
