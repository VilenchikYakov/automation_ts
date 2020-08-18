import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';
import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';

export default class OpenHouseFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-openHouse');
  }

  setFilter(values: Array<string>) {
    info(`Setting openHouse filter using ${values} selectors`);
    values.forEach((value) => {
      new BaseElement(`filterCheckbox-${value}`).waitAndClick();
    });
    this.applyPopUp();
  }
}
