import { info } from '../../../../utils/logUtils';
import { getRandomBoolean, getRandomItemOutOfArray } from '../../../../utils/generalUtils';
import BaseElement from '../../../baseElement';
import CommonWizard from '../../../commonPages/blocks/wizardBlock/commonWizard';

export default class FilterWizard extends CommonWizard {
  /**
   * Set filter data or click on skip button
   * @returns { isSkip: boolean } | { amountRooms: string, priceFilter: string | { isSkip: boolean }, isSkip: false }
   */
  skipOrSetFiltersB1E3(dealType: string): any {
    if (getRandomBoolean()) {
      info('Skip set filter in FilterWizard');
      this.goNextWizard(true);
      return { isSkip: true };
    }
    const amountRooms = this.getRandomAmountRooms();
    const priceFilter = dealType.toLowerCase() === 'rent' ? { isSkip: true } : this.clickAndGetPriceFilterText();
    this.goNextWizard(false);
    return { amountRooms, priceFilter, isSkip: false };
  }

  /**
   * Set filter data or skip
   * @returns { isSkip: boolean } | { amountRooms: string, priceFilter: string, isSkip: false }
   */
  skipOrSetFilters(): { isSkip: true } | { amountRooms: string; priceFilter: string; isSkip: false } {
    if (getRandomBoolean()) {
      info('Skip set filter in FilterWizard');
      return { isSkip: true };
    }
    const amountRooms = this.getRandomAmountRooms();
    const priceFilter = this.clickAndGetPriceFilterText();
    return { amountRooms, priceFilter, isSkip: false };
  }

  /**
   * Click on random room button
   * @returns {string} label of button
   */
  getRandomAmountRooms(): string {
    const listText = ['Studio', '1', '2', '3', '4+'];
    const chosenRooms = getRandomItemOutOfArray(listText);

    info(`Choose random amount room: ${chosenRooms}`);
    this.getAmountRoomsByText(chosenRooms).waitAndClick();

    return chosenRooms;
  }

  clickAndGetPriceFilterText() {
    this.filterSlider.waitAndClick();
    return this.priceRange.getText();
  }

  getAmountRoomsByText(text) {
    return new BaseElement(`[data-auto="filter-select-button-${text}"]`);
  }

  get filterSlider() {
    return new BaseElement('priceSlider');
  }

  get priceRange() {
    return new BaseElement('priceRange');
  }
}
