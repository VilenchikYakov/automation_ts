import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';

export default class NoFeeFilter extends CommonFilterPopUp {
  constructor() {
    super('noFeeFilter');
  }

  setFilter() {
    this.waitAndClick();
  }
}
