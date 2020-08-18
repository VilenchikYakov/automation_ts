import ExploreAddressPage from '../nycPages/exploreAddressPage';
import TransportationBlock from './blocks/commonBlocks/transportationBlock';

class DesktopExploreAddressPage extends ExploreAddressPage {
  readonly transportation = new TransportationBlock();
}

export default new DesktopExploreAddressPage();
