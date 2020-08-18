import CommonExpandableBlock from './commonExpandableBlock';
import CommonEveryDayLifeBlock from '../unitBlocks/commonEveryDayLifeBlock';

export default class CommonExpandableEveryDayLifeBlock extends CommonExpandableBlock {
  readonly everyDayLifeBlock = new CommonEveryDayLifeBlock();
  constructor() {
    super('collapsed-everydayLife');
  }
}
