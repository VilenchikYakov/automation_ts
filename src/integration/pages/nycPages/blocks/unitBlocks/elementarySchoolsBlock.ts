import CommonElementarySchoolsBlock from '../../../commonPages/blocks/unitBlocks/commonElementarySchoolsBlock';
import BaseElement from '../../../baseElement';

export default class ElementarySchoolsBlock extends CommonElementarySchoolsBlock {
  chooseFirstElementarySchool() {
    this.firstElementarySchool.waitAndClick();
  }

  getElementarySchoolList(): BaseElement[] {
    this.firstElementarySchool.waitForExist(10000);
    return this.elementarySchools;
  }

  private get elementarySchools(): BaseElement[] {
    return $$('[data-auto="school-Elementary"]').map((element) => new BaseElement(element));
  }

  get firstElementarySchool() {
    return new BaseElement('school-Elementary');
  }
}
