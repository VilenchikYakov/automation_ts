import BaseElement from '../../../baseElement';
import SchoolsBlock from './schoolsBlock';
import DayCareBlock from './dayCareBlock';
export default class GreatSchoolBlock extends BaseElement {
  constructor() {
    super('GreatSchool-block');
  }

  get schoolsList() {
    this.firstSchool.optionalWaitForExist(10000);
    return $$('[data-auto="school-card-wrapper"]').map((element) => new SchoolsBlock(element));
  }

  get dayCareList() {
    this.firstDayCare.optionalWaitForExist(10000);
    return $$('[data-auto="dayCare-card-wrapper"]').map((element) => new DayCareBlock(element));
  }

  get firstSchool() {
    return new SchoolsBlock();
  }

  get firstDayCare() {
    return new DayCareBlock();
  }
}
