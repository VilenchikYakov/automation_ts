import { info } from '../../utils/logUtils';
import BaseElement from '../baseElement';

export default class SaveSearchToggle extends BaseElement {
  readonly selector: string;
  constructor(parentElement = '') {
    super('save-search-button-wrapper', parentElement);
    info(`Save toggle: ${this.selector}`);
  }

  saveSearch() {
    this.saveSearchToggle.waitAndClick();
  }

  get saveSearchToggle() {
    return new BaseElement('toggle-checkbox', this.self);
  }
}
