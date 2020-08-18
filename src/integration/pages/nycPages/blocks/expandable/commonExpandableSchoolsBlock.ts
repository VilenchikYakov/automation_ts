import SchoolsBlock from '../commonBlocks/schoolsBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandableSchoolsBlock extends CommonExpandableBlock {
  readonly schoolsBlock = new SchoolsBlock();
  constructor() {
    super('collapsed-schools');
  }
}
