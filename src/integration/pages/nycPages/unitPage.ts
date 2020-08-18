import ProsAndConsBlock from './blocks/commonBlocks/prosAndConsBlock';
import CommonSuccessPopUp from './blocks/popUps/commonSuccessPopUp';
import SellerStickyFooter from '../commonPages/blocks/footers/SellerStickyFooter';
import CommonUnitPage from '../commonPages/commonUnitPage';
import CommutePopUp from './blocks/popUps/commutePopUp';
import PricesHistoryBlock from './blocks/unitBlocks/pricesHistoryBlock';
import BuildingDetailsBlock from '../commonPages/blocks/unitBlocks/buildingDetailsBlock';
import AreaInsightBlock from './blocks/unitBlocks/areaInsightBlock';
import AgentDetailsBlock from './blocks/unitBlocks/agentDetailsBlock';
import DescriptionBlock from './blocks/unitBlocks/descriptionBlock';
import SimilarHomesBlock from './blocks/unitBlocks/similarHomesBlock';
import ExploreTheAreaBlock from './blocks/unitBlocks/exploreTheAreaBlock';
import OverviewHeaderBlock from '../commonPages/blocks/unitBlocks/overviewHeaderBlock';
import PriceEstimationBlock from '../commonPages/blocks/unitBlocks/priceEstimationBlock';
import AmenitiesBlock from './blocks/unitBlocks/amenitiesBlock';
import FooterBlock from './blocks/commonBlocks/footerBlock';

export default class UnitPage extends CommonUnitPage {
  readonly prosAndConsBlock = new ProsAndConsBlock();
  readonly commonSuccessPopUp = new CommonSuccessPopUp();
  readonly exploreAreaBlock = new ExploreTheAreaBlock();
  readonly sellerStickyFooter = new SellerStickyFooter();
  readonly commutePopUp = new CommutePopUp();
  readonly pricesHistory = new PricesHistoryBlock();
  readonly buildingInfo = new BuildingDetailsBlock();
  readonly areaInsight = new AreaInsightBlock();
  readonly agentDetails = new AgentDetailsBlock();
  readonly footerBlock = new FooterBlock();
  readonly description = new DescriptionBlock();
  readonly similarHomes = new SimilarHomesBlock();
  readonly overviewHeaderBlock = new OverviewHeaderBlock();
  readonly priceEstimationBlock = new PriceEstimationBlock();
  readonly amenities = new AmenitiesBlock();
}
