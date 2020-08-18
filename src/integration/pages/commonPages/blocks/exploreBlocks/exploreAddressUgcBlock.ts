import BaseElement from '../../../baseElement';

export default class UgcBlock extends BaseElement {
  constructor() {
    super('review-story-selector');
  }

  get ratingSelectorWrapper() {
    return new BaseElement('rating-selector-wrapper');
  }

  get answerListWrapper() {
    return new BaseElement('answer-list-wrapper');
  }

  get shareYourStoryButton() {
    return new BaseElement('share-your-story-button');
  }

  get ugcQuestion() {
    return new BaseElement('ugc-question');
  }

  get ugcAnswers() {
    return $$('[data-auto^="ugc-answer"]').map((element) => new BaseElement(element));
  }
}
