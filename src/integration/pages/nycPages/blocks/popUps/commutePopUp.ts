import BaseElement from '../../../baseElement';
import CommonCommutePopUp from '../../../commonPages/blocks/popUps/commonCommutePopUp';

export default class CommutePopUp extends CommonCommutePopUp {
  chooseBike() {
    this.bikeButton.waitAndClick();
  }

  chooseCommute() {
    this.commuteButton.waitAndClick();
  }

  get commuteButton() {
    return new BaseElement('commute-type-commute');
  }

  get bikeButton() {
    return new BaseElement('commute-type-bike');
  }
}
