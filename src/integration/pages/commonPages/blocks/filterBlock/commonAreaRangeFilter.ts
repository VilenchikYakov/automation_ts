import CommonFilterPopUp from '../popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class CommonAreaRangeFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-areaRange');
  }

  operateFilter(minValue: number, maxValue: number) {
    info(`operating dropdown filters`);
    info(`setting lower dropdown filter using ${minValue}`);
    this.dropDownElements[0].waitAndClick();
    this.dropDownItemsList.$(`[data-auto-sort-name="${minValue}"]`).click();
    info(`setting upper dropdown filter using ${maxValue}`);
    this.dropDownElements[1].waitAndClick();
    this.dropDownItemsList.$(`[data-auto-sort-name="${maxValue}"]`).click();
    this.applyPopUp();
  }

  get dropDownElements() {
    return this.$$('[data-auto="sort-selector"]').map((element) => new BaseElement(element));
  }

  get dropDownItemsList() {
    return new BaseElement('menu-item-root');
  }
}
