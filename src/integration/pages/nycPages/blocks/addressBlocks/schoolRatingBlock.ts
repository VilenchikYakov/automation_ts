import BaseElement from '../../../baseElement';
export default class SchoolRatingBlock extends BaseElement {
  constructor() {
    super('school-rating-wrapper');
  }

  get ratingText() {
    return new BaseElement('school-rating-text');
  }
}
