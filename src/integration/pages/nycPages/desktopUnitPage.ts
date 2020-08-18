import UnitPage from './unitPage';
import DesktopHeader from '../commonPages/blocks/headers/desktopHeader';
import DesktopOverviewHeaderBlock from './blocks/unitBlocks/desktopOverviewHeaderBlock';
import NavigationSubHeader from './blocks/headers/desktopUnitPageNavigationSubHeader';

class DesktopUnitPage extends UnitPage {
  readonly header = new DesktopHeader();
  readonly overviewHeaderBlock = new DesktopOverviewHeaderBlock();
  readonly navigationSubHeader = new NavigationSubHeader();
}

export default new DesktopUnitPage();
