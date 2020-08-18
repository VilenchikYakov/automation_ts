import BaseElement from '../../../baseElement';

export default class SaveSearchBlock extends BaseElement {
  constructor() {
    super('full-match-card');
  }

  saveSearch() {
    this.bulletinSaveSearchButton.waitAndClick();
  }

  get bulletinSaveSearchButton() {
    return new BaseElement('save-search-button', this.self);
  }
}
