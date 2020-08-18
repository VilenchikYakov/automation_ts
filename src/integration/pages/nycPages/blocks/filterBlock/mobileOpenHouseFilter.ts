import CommonFilterPopUp from '../../../commonPages/blocks/popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class MobileOpenHouseFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-openHouse');
  }

  setFilter(values: Array<string>) {
    this.collapsableSection.waitAndClick();
    info(`Setting openHouse filter using ${values} selectors`);
    values.forEach((value) => {
      new BaseElement(`filterCheckbox-${value}`).waitAndClick();
    });
    this.applyPopUp();
  }

  get collapsableSection() {
    return new BaseElement('section-openHouse');
  }
}
