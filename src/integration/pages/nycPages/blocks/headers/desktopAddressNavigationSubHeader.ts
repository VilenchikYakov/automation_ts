import DesktopNavigationSubHeader from '../../../commonPages/blocks/headers/desktopNavigationSubHeader';
import SearchInput from '../../../elements/searchInput';
import BaseElement from '../../../baseElement';

export default class DesktopAddressNavigationSubHeader extends DesktopNavigationSubHeader {
  readonly searchInput = new SearchInput();

  navigateToOverview() {
    this.overview.waitAndClick();
  }

  navigateToPrices() {
    this.prices.waitAndClick();
  }

  navigateToSchools() {
    this.schools.waitAndClick();
  }

  navigateToPlanning() {
    this.planning.waitAndClick();
  }

  navigateToTransportation() {
    this.transportation.waitAndClick();
  }

  navigateToNeighbourhoodLife() {
    this.neighbourhoodLife.waitAndClick();
  }

  navigateToSafety() {
    this.safety.waitAndClick();
  }

  private get overview() {
    return new BaseElement('Overview');
  }

  private get prices() {
    return new BaseElement('Prices');
  }

  private get schools() {
    return new BaseElement('Schools');
  }

  private get planning() {
    return new BaseElement('Planning');
  }

  private get transportation() {
    return new BaseElement('Transportation');
  }

  private get neighbourhoodLife() {
    return new BaseElement('NeighbourhoodLife');
  }

  private get safety() {
    return new BaseElement('Safety');
  }
}
