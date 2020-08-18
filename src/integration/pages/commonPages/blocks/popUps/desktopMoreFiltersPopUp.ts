import CommonFilterPopUp from './commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';

export default class DesktopMoreFiltersPopUp extends CommonFilterPopUp {
  constructor() {
    super('filters-container');
  }

  setFilterInView(filterName: string = '') {
    info(`Scroll to filter ${filterName} located under moreFilters inToView`);
    new BaseElement(`filter-${filterName}`).scrollIntoView({ block: 'center' });
  }
}
