import { info } from '../../utils/logUtils';
import BaseElement from '../baseElement';

export default class TextInput extends BaseElement {
  clearTextField() {
    info('Clear text field element');
    this.waitAndSetValue('\uE003'.repeat(this.getValue().length));
  }

  setInputValue(value: string, clearField: boolean = true) {
    clearField ? this.clearTextField() : info('TextInput should not be cleared');
    info(`Set value: ${value}`);
    this.waitAndSetValue(value);
  }
}
