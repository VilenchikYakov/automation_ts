import CommonPriorityPopUp from './commonPriorityPopUp';
import BaseElement from '../../../baseElement';
import CommonDesktopPriorityPopUp from '../../../commonPages/blocks/popUps/commonDesktopPriorityPopUp';

export default class DesktopPriorityPopUp extends CommonDesktopPriorityPopUp {
  readonly priorityPopUp = new CommonPriorityPopUp();

  get closePopUp() {
    return new BaseElement('close-priorities-button');
  }
}
