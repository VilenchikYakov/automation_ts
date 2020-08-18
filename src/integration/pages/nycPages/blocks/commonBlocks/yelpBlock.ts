import BaseElement from '../../../baseElement';

export default class YelpBlock extends BaseElement {
  constructor(yelpElement?: string | WebdriverIO.Element) {
    super(yelpElement ? yelpElement : 'card-info');
  }

  get cardLink() {
    return new BaseElement('card-link');
  }

  get cardLabel() {
    return new BaseElement('card-label');
  }

  get cardDescription() {
    return new BaseElement('card-description');
  }

  get cardWalkingTime() {
    return new BaseElement('walking');
  }
}
