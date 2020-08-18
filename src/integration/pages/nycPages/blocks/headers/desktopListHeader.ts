import CommonDesktopListHeader from '../../../commonPages/blocks/headers/commonDesktopListHeader';
import DesktopFilterPanel from '../desktopFilterPanel';

export default class DesktopListHeader extends CommonDesktopListHeader {
  readonly filterPanel = new DesktopFilterPanel();
}
