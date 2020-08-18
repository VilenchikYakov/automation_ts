import BaseElement from '../../../baseElement';

export default class LocationBlock extends BaseElement {
  constructor() {
    super('Overview/location-block');
  }

  get locationMap() {
    return new BaseElement('location-map');
  }
}
