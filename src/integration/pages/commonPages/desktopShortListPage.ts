import CommonShortListPage from '../commonPages/commonShortListPage';
import DesktopHeader from './blocks/headers/desktopHeader';
class DesktopShortListPage extends CommonShortListPage {
  readonly header = new DesktopHeader();
}
export default new DesktopShortListPage();
