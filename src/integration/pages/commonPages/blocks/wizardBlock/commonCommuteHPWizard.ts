import CommonWizard from './commonWizard';
import BaseElement from '../../../baseElement';

export default class CommonCommuteHPWizard extends CommonWizard {
  chooseCar() {
    this.carButton.waitAndClick();
  }

  chooseWalk() {
    this.walkButton.waitAndClick();
  }

  get carButton() {
    return new BaseElement('commute-circle-button-car');
  }

  get walkButton() {
    return new BaseElement('commute-circle-button-walk');
  }
}
