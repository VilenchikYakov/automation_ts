import CommonMobileFilterPanel from '../../commonPages/blocks/commonMobileFilterPanel';
import MobileFilterPopUp from './popUps/mobileFilterPopup';
import MobilePriorityPopUp from './popUps/mobilePriorityPopUp';

export default class MobileFilterPanel extends CommonMobileFilterPanel {
  readonly filterPopUp = new MobileFilterPopUp();
  readonly mobilePriorityPopUp = new MobilePriorityPopUp();
}
