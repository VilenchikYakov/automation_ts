import AddressPage from './addressPage';
import DesktopHeader from '../commonPages/blocks/headers/desktopHeader';
import DesktopOverviewHeaderBlock from '../nycPages/blocks/addressBlocks/desktopOverviewHeaderBlock';

class DesktopAddressPage extends AddressPage {
  readonly header = new DesktopHeader();
  readonly overviewHeaderBlock = new DesktopOverviewHeaderBlock();
}
export default new DesktopAddressPage();
