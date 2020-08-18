import CommonModalPopUp from './commonModalPopUp';
import BaseElement from '../../../baseElement';
import { info } from '../../../../utils/logUtils';

export default class CommonUgc extends CommonModalPopUp {
  bypassUgc() {
    if (this.ugcQuestion.optionalWaitForExist()) {
      this.closePopUp();
      this.ugcQuestion.waitForExist(1000, true);
    } else {
      info(`UGC didn't show`);
    }
  }

  get ugcQuestion() {
    return new BaseElement('ugc-question', this.selector);
  }

  get skip() {
    return new BaseElement('next-skip-button', this.selector);
  }

  get back() {
    return new BaseElement('back-button', this.selector);
  }
}
