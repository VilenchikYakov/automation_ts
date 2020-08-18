import TransportationBlock from '../commonBlocks/transportationBlock';
import CommonExpandableBlock from '../expandable/commonExpandableBlock';

export default class CommonExpandableTransportationBlock extends CommonExpandableBlock {
  readonly transportation = new TransportationBlock();
  constructor() {
    super('collapsed-transportation');
  }
}
