import BasePage from '../basePage';
import DesktopHeader from '../commonPages/blocks/headers/desktopHeader';
import OverviewBlock from './blocks/addressBlocks/overviewHeaderBlock';
import ExploreTheAreaBlock from '../commonPages/blocks/commonBlocks/exploreTheAreaBlock';
import SchoolsBlock from './blocks/commonBlocks/schoolsBlock';
import ProsAndConsBlock from './blocks/commonBlocks/prosAndConsBlock';
import DesktopAddressNavigationSubHeader from './blocks/headers/desktopAddressNavigationSubHeader';
import PlanningBlock from './blocks/exploreBlocks/planningBlock';
import NeighbourhoodLifeBlock from './blocks/exploreBlocks/neighbourhoodLifeBlock';
import PricesBlock from '../commonPages/blocks/commonBlocks/pricesBlock';
import SafetyBlock from './blocks/commonBlocks/safetyBlock';
import UgcBlock from '../commonPages/blocks/exploreBlocks/exploreAddressUgcBlock';
import FooterBlock from './blocks/commonBlocks/footerBlock';

export default class ExploreAddressPage extends BasePage {
  readonly header = new DesktopHeader();
  readonly navigationSubHeader = new DesktopAddressNavigationSubHeader();
  readonly overview = new OverviewBlock();
  readonly exploreArea = new ExploreTheAreaBlock();
  readonly schools = new SchoolsBlock();
  readonly planning = new PlanningBlock();
  readonly footerBlock = new FooterBlock();
  readonly prosAndConsBlock = new ProsAndConsBlock();
  readonly nghbLife = new NeighbourhoodLifeBlock();
  readonly prices = new PricesBlock();
  readonly safety = new SafetyBlock();
  readonly ugcBlock = new UgcBlock();
}
