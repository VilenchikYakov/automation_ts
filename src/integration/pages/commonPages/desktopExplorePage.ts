import CommonExplorePage from './commonExplorePage';
import DesktopHeader from './blocks/headers/desktopHeader';

class DesktopExplorePage extends CommonExplorePage {
  readonly header = new DesktopHeader();
}
export default new DesktopExplorePage();
