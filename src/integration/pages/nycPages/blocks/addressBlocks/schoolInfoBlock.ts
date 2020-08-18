import BaseElement from '../../../baseElement';

export default class SchoolInfoBlock extends BaseElement {
  constructor() {
    super('school-info');
  }

  get schoolName() {
    return new BaseElement('school-name');
  }

  get schoolZone() {
    return new BaseElement('school-zone');
  }

  get schoolType() {
    return new BaseElement('school-type');
  }

  get walkTime() {
    return new BaseElement('school-walt-time');
  }
}
