import CommonNeighboursBlock from '../unitBlocks/commonNeighborsBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandableNeighborsBlock extends CommonExpandableBlock {
  readonly neighborsBlock = new CommonNeighboursBlock();
  constructor() {
    super('collapsed-neighbors');
  }
}
