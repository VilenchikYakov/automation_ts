import BaseElement from '../../baseElement';

export default class SavedAddressCard extends BaseElement {
  constructor(element?: string | WebdriverIO.Element) {
    super(element ? element : 'saved-address-card');
  }

  get deleteSearch() {
    return new BaseElement('button-delete-search', this.self);
  }

  get confirmDelete() {
    return new BaseElement($('button'), this.self);
  }
}
