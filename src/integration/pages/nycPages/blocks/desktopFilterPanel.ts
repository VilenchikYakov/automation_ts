import CommonDesktopFilterPanel from '../../commonPages/blocks/commonDesktopFilterPanel';
import DesktopFilterPopUp from './popUps/desktopFilterPopUp';
import DesktopPriorityPopUp from './popUps/desktopPriorityPopUp';

export default class DesktopFilterPanel extends CommonDesktopFilterPanel {
  readonly filterPopUp = new DesktopFilterPopUp();
  readonly desktopPriorityPopUp = new DesktopPriorityPopUp();
}
