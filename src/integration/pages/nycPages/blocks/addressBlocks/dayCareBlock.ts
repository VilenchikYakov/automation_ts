import BaseElement from '../../../baseElement';
export default class DayCareBlock extends BaseElement {
  constructor(dayCareStr?: string | WebdriverIO.Element) {
    super(dayCareStr ? dayCareStr : 'dayCare-card-wrapper');
  }

  get dayCareSchoolName() {
    return new BaseElement('dayCare-school-name');
  }

  get dayCareWalkTime() {
    return new BaseElement('dayCare-school-walt-time');
  }
}
