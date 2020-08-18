import CommonExploreAreaBlock from '../commonBlocks/commonExploreAreaBlock';
import CommonExpandableSchoolsBlock from '../expandable/commonExpandableSchoolsBlock';
import CommonExpandableSafetyBlock from '../expandable/commonExpandableSafetyBlock';
import CommonExpandableTransportationBlock from '../expandable/commonExpandableTransportationBlock';
import CommonExpandableNewConstructionBlock from '../expandable/commonExpandableNewConstructionBlock';
import CommonExpandablePriceTrendsBlock from '../expandable/commonExpandablePriceTrendsBlock';
import CommonExpandableGoingOutBlock from '../expandable/commonExpandableGoingOutBlock';
import CommonExpandableEveryDayLifeBlock from '../expandable/commonExpandableEveryDailyLife';
import CommonExpandableParksAndOutdoorsBlock from '../expandable/commonExpandableParkAndOutdoorsBlock';
import CommonExpandableNeighborsBlock from '../expandable/commonExpandableNeighborsBlock';

export default class ExploreTheAreaBlock extends CommonExploreAreaBlock {
  readonly expandableSchoolsBlock = new CommonExpandableSchoolsBlock();
  readonly expandableSafetyBlock = new CommonExpandableSafetyBlock();
  readonly expandableTransportationBlock = new CommonExpandableTransportationBlock();
  readonly expandableNewConstruction = new CommonExpandableNewConstructionBlock();
  readonly expandablePriceTrends = new CommonExpandablePriceTrendsBlock();
  readonly expandableGoingOutBlock = new CommonExpandableGoingOutBlock();
  readonly expandableEveryDayLifeBlock = new CommonExpandableEveryDayLifeBlock();
  readonly expandableParksAndOutdoorsBlock = new CommonExpandableParksAndOutdoorsBlock();
  readonly expandableNeighborsBlock = new CommonExpandableNeighborsBlock();
}
