import CommonFilterPopUp from '../popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class CommonRoomsRangeFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-roomsRange');
  }

  setFilter(minValue: string, maxValue?: string) {
    info(`Setting rooms filter using minValue: ${minValue} and maxValue: ${maxValue}`);
    new BaseElement(`filter-select-button-${minValue}`).waitAndClick();
    if (maxValue) {
      new BaseElement(`filter-select-button-${maxValue}`).waitAndClick();
    }
    this.applyPopUp();
  }
}
