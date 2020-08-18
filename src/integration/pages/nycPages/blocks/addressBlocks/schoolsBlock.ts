import BaseElement from '../../../baseElement';
import SchoolInfoBlock from './schoolInfoBlock';
import SchoolRatingBlock from './schoolRatingBlock';

export default class SchoolsBlock extends BaseElement {
  readonly schoolInfo = new SchoolInfoBlock();
  readonly schoolRating = new SchoolRatingBlock();

  constructor(schoolStr?: string | WebdriverIO.Element) {
    super(schoolStr ? schoolStr : 'school-card-wrapper');
  }
}
