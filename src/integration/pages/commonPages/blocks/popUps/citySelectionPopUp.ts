import BaseElement from '../../../baseElement';
import { automationTags } from '../../../../data/webElementData';
import { info } from '../../../../utils/logUtils';

export default class CitySelectionPopUp extends BaseElement {
  constructor() {
    super('menu-item-root');
  }

  selectLocalizeCity(cityName: string): void {
    info(`Selecting localize city: ${cityName}`);
    this.localizeCitiesSelectionList
      .find((item) => item.getAttribute(automationTags.dataAutoSortName) === cityName)
      .waitAndClick();
  }

  get localizeCitiesSelectionList() {
    return $$('[data-auto="menu-item"]').map((element) => new BaseElement(element));
  }
}
