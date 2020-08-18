import CommonFilterPanel from './commonFilterPanel';
import { info } from '../../../utils/logUtils';
import DesktopMoreFiltersPopUp from './popUps/desktopMoreFiltersPopUp';
import BaseElement from '../../baseElement';
import CommonDesktopPriorityPopUp from './popUps/commonDesktopPriorityPopUp';

export default class CommonDesktopFilterPanel extends CommonFilterPanel {
  readonly desktopMoreFiltersPopUp = new DesktopMoreFiltersPopUp();
  readonly desktopPriorityPopUp = new CommonDesktopPriorityPopUp();

  constructor() {
    super('filters');
  }

  openFilterPopUp(filterName: string) {
    if (filterName === 'noFeeFilter') {
      info(`NoFee filter has no expandable popup, continue`);
    } else {
      const filterButton = new BaseElement(`filter-${filterName}`);
      if (filterButton.isExisting()) {
        info(`Filter with selector string ${filterButton.selector} is in view, performing click to open it`);
        filterButton.waitAndClick();
      } else {
        info(`Filter with selector ${filterButton.selector} is not in view, performing click moreFilters button`);
        this.moreFiltersButton.waitAndClick();
        this.desktopMoreFiltersPopUp.setFilterInView(filterName);
      }
    }
  }

  get moreFiltersButton() {
    return new BaseElement('filter-moreFilters');
  }
}
