import CommonSchoolsBlock from '../../../commonPages/blocks/unitBlocks/commonSchoolsBlock';
import ElementarySchoolsBlock from '../unitBlocks/elementarySchoolsBlock';

export default class SchoolsBlock extends CommonSchoolsBlock {
  readonly elementarySchools = new ElementarySchoolsBlock();
}
