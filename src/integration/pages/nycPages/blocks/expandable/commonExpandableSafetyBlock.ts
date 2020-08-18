import CommonSafetyBlock from '../../../commonPages/blocks/unitBlocks/commonSafetyBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandableSafetyBlock extends CommonExpandableBlock {
  readonly safetyBlock = new CommonSafetyBlock();
  constructor() {
    super('collapsed-safety');
  }
}
