import DesktopHeader from './blocks/headers/desktopHeader';
import BaseElement from '../baseElement';
import FollowPage from './followPage';

class DesktopFollowPage extends FollowPage {
  readonly header = new DesktopHeader();
}
export default new DesktopFollowPage();
