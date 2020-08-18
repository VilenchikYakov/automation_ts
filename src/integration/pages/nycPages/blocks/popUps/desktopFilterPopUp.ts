import CommonDesktopFilterPopUp from '../../../commonPages/blocks/popUps/commonDesktopFilterPopUp';
import CommonRoomsRangeFilter from '../../../commonPages/blocks/filterBlock/commonRoomsFilter';
import CommonAreaRangeFilter from '../../../commonPages/blocks/filterBlock/commonAreaRangeFilter';
import CommonPropertyTypesFilter from '../../../commonPages/blocks/filterBlock/commonDesktopPropertyTypesFilter';
import CommonAmenitiesFilter from '../../../commonPages/blocks/filterBlock/commonDesktopAmenitiesFilter';
import CommonPriceRangeFilter from '../../../commonPages/blocks/filterBlock/commonPriceRangeFilter';
import NoFeeFilter from '../filterBlock/noFeeFilter';
import BathsRangeFilter from '../filterBlock/bathRangeFilter';
import OpenHouseFilter from '../filterBlock/openHouseFilter';

export default class DesktopFilterPopUp extends CommonDesktopFilterPopUp {
  readonly anyPrice = new CommonPriceRangeFilter();
  readonly roomsRange = new CommonRoomsRangeFilter();
  readonly areaRange = new CommonAreaRangeFilter();
  readonly propertyTypes = new CommonPropertyTypesFilter();
  readonly amenities = new CommonAmenitiesFilter();
  readonly noFee = new NoFeeFilter();
  readonly bathsRange = new BathsRangeFilter();
  readonly openHouse = new OpenHouseFilter();
}
