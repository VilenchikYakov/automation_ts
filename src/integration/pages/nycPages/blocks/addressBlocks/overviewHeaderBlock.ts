import BaseElement from '../../../baseElement';
import CommonOverviewHeaderBlock from '../../../commonPages/blocks/commonBlocks/commonOverviewHeaderBlock';

export default class OverviewHeaderBlock extends CommonOverviewHeaderBlock {
  get primaryAddress() {
    return new BaseElement('address-page-primary-address');
  }

  get address() {
    return new BaseElement('address-page-address');
  }

  get boroughCity() {
    return new BaseElement('address-page-borough-city');
  }

  get totalUnits() {
    return new BaseElement('units-total');
  }

  get floorCount() {
    return new BaseElement('floor-count');
  }

  get builtIn() {
    return new BaseElement('construction-year');
  }

  get buildingClass() {
    return new BaseElement('building-class');
  }
}
