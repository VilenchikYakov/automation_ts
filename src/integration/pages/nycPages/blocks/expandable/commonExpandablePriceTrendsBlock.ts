import PricesBlock from '../../../commonPages/blocks/commonBlocks/pricesBlock';
import CommonExpandableBlock from './commonExpandableBlock';

export default class CommonExpandablePriceTrendsBlock extends CommonExpandableBlock {
  readonly pricesBlock = new PricesBlock();
  constructor() {
    super('collapsed-prices');
  }
}
