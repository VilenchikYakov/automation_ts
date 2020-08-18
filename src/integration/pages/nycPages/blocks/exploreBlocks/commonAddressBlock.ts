import BaseElement from '../../../baseElement';

export default class CommonAddressBlock extends BaseElement {
  constructor() {
    super('madlan-address-block');
  }

  get address() {
    return new BaseElement('madlan-address-page-address');
  }

  get addressType() {
    return new BaseElement('madlan-address-page-type');
  }
}
