import CommonOpenAirBlock from '../unitBlocks/commonOpenAirBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandableParksAndOutdoorsBlock extends CommonExpandableBlock {
  readonly openAirBlock = new CommonOpenAirBlock();
  constructor() {
    super('collapsed-openAir');
  }
}
