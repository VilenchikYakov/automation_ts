import CommonFilterPopUp from '../popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class CommonAmenitiesFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-amenities');
  }

  setFilter(values: Array<string>) {
    info(`Setting amenities filter using ${values} selectors`);
    values.forEach((value) => {
      new BaseElement(`filterCheckbox-${value}`).waitAndClick();
    });
    this.applyPopUp();
  }
}
