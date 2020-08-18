import CommonFilterPopUp from '../popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class CommonPropertyTypesFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-propertyTypes');
  }

  setFilter(values: Array<string>) {
    info(`Setting property types filter using ${values} selectors`);
    values.forEach((value) => {
      new BaseElement(`filterCheckbox-${value}`).waitAndClick();
    });
    this.applyPopUp();
  }
}
