import CommonSellerBlock from './commonSellerBlock';
import CommonDescriptionBlock from '../../../commonPages/blocks/unitBlocks/commonDescriptionBlock';

export default class DescriptionBlock extends CommonDescriptionBlock {
  readonly sellerBlock = new CommonSellerBlock();
}
