import BaseElement from '../../../baseElement';
import CommonOverviewHeaderBlock from '../commonBlocks/commonOverviewHeaderBlock';

export default class OverviewHeaderBlock extends CommonOverviewHeaderBlock {
  get primaryAddress() {
    return new BaseElement('primary_address');
  }

  get primaryAddressText() {
    return new BaseElement('primary_address_text');
  }

  get secondaryAddress() {
    return new BaseElement('secondary_address');
  }

  get secondaryAddressText() {
    return new BaseElement('secondary_address_text');
  }

  get buildingClass() {
    return new BaseElement('building-class');
  }

  get bedsCount() {
    return new BaseElement('beds-count');
  }

  get baths() {
    return new BaseElement('baths');
  }

  get floor() {
    return new BaseElement('floor');
  }

  get area() {
    return new BaseElement('area');
  }

  get price() {
    return new BaseElement('current-price');
  }
}
