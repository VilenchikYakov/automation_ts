import BaseElement from '../../../baseElement';

export default class SuggestionBlock extends BaseElement {
  constructor(suggestionStr?: string | WebdriverIO.Element) {
    super(suggestionStr ? suggestionStr : 'autocomplete-suggestion');
  }

  get suggestionType() {
    return new BaseElement('suggestion-type', this.self);
  }

  get suggestionText() {
    return new BaseElement('suggetion-text', this.self);
  }
}
