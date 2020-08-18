import BaseElement from '../../../baseElement';
import CommonModalPopUp from './commonModalPopUp';
import SearchInput from '../../../elements/searchInput';

export default class CommonCommutePopUp extends CommonModalPopUp {
  chooseCar() {
    this.carButton.waitAndClick();
  }

  chooseWalk() {
    this.walkButton.waitAndClick();
  }

  submit() {
    this.submitButton.waitAndClick();
  }

  get submitButton() {
    return new BaseElement('filterSubmitButton');
  }

  get carButton() {
    return new BaseElement('commute-type-car');
  }

  get walkButton() {
    return new BaseElement('commute-type-walk');
  }

  get searchCommuteInput() {
    return new SearchInput(this.selector);
  }
}
