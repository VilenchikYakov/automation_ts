import CommonGoingOutBlock from '../unitBlocks/commonGoingOutBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandableGoingOutBlock extends CommonExpandableBlock {
  readonly goingOutBlock = new CommonGoingOutBlock();
  constructor() {
    super('collapsed-goingOut');
  }
}
