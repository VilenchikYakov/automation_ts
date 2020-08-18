import PlanningBlock from '../../../commonPages/blocks/unitBlocks/planningBlock';
import CommonExpandableBlock from '../expandable/commonExpandableBlock';

export default class CommonExpandableNewConstructionBlock extends CommonExpandableBlock {
  readonly planningBlock = new PlanningBlock();
  constructor() {
    super('collapsed-newConstructions');
  }
}
