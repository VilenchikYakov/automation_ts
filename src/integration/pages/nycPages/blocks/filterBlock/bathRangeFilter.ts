import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';
import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';

export default class BathsRangeFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-bathsRange');
  }

  setFilter(minValue: string, maxValue?: string) {
    info(`Setting bath filter using minValue: ${minValue} and maxValue: ${maxValue}`);
    new BaseElement(`filter-select-button-${minValue}`).waitAndClick();
    if (maxValue) {
      new BaseElement(`filter-select-button-${maxValue}`).waitAndClick();
    }
    this.applyPopUp();
  }
}
