import DesktopNavigationSubHeader from '../../../commonPages/blocks/headers/desktopNavigationSubHeader';
import BaseElement from '../../../baseElement';

export default class DesktopUnitPageNavigationSubHeader extends DesktopNavigationSubHeader {
  navigateToOverview() {
    this.overview.waitAndClick();
  }

  navigateToPrices() {
    this.prices.waitAndClick();
  }

  navigateToBuildingDetails() {
    this.buildingDetails.waitAndClick();
  }

  navigateToAreaInsights() {
    this.areaInsights.waitAndClick();
  }

  navigateToSimilarHomes() {
    this.similarHomes.waitAndClick();
  }

  private get overview() {
    return new BaseElement('Overview');
  }

  private get prices() {
    return new BaseElement('PricesEstimation');
  }

  private get buildingDetails() {
    return new BaseElement('BuildingDetails');
  }

  private get areaInsights() {
    return new BaseElement('area_insights');
  }

  private get similarHomes() {
    return new BaseElement('SimilarHomes');
  }
}
