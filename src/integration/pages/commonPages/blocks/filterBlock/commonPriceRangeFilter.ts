import CommonFilterPopUp from '../popUps/commonFilterPopUp';
import { info } from '../../../../utils/logUtils';
import { addUrlParams } from '../../../../utils/urlUtils';
import waitUtils from '../../../../utils/waitUtils';
import BaseElement from '../../../baseElement';
import { iTestFilter } from '../../../../interfaces';

export default class CommonPriceRangeFilter extends CommonFilterPopUp {
  constructor() {
    super('filter-priceRange');
  }

  setFilter(minValue: number, maxValue: number) {
    this.scrollIntoView();
    info(`Setting price filter using  minValue: ${minValue} maxValue: ${maxValue}`);
    let currentUrl = browser.getUrl();
    info(`currentUrl: ${currentUrl}`);
    let urlWithFilter: string = addUrlParams(currentUrl, [
      { key: 'filters', value: `_${minValue}-${maxValue}__________0-10000` },
    ]);
    info(`urlWithFilter: ${urlWithFilter}`);
    browser.url(urlWithFilter);
    waitUtils.waitPageIsReady();
  }

  // TODO - refine sliders
  setSliderFilterButtons(testFilter: iTestFilter) {
    info(
      `Setting slider filter ${testFilter.filterName} minValue: ${testFilter.values[0]} maxValue: ${testFilter.values[1]}`,
    );
    const sliderButtonsList = this.sliderButtons;
    const minSliderLoc = sliderButtonsList[0].getLocation();
    const maxSliderLoc = sliderButtonsList[1].getLocation();
    info(`minSliderLoc: ${JSON.stringify(minSliderLoc)}`);
    info(`maxSliderLoc: ${JSON.stringify(maxSliderLoc)}`);
    const maxMinPixels = maxSliderLoc['x'] - minSliderLoc['x'];
    info(`maxMinPixels: ${maxMinPixels}`);
    const maxValue = testFilter.searchType === 'buy' ? testFilter.sellMaxValue : testFilter.rentMaxValue;
    info(`maxValue: ${maxValue}`);
    let pixelPerPrice = maxMinPixels / maxValue;
    info(`pixelPerPrice: ${pixelPerPrice}`);
    let minChange = testFilter.values[0] * pixelPerPrice;
    let maxChange = (maxValue - testFilter.values[1]) * pixelPerPrice;
    info(`minChange: ${minChange} - maxChange: ${maxChange}`);

    switch (testFilter.priceRangeSelection) {
      case 'min':
        sliderButtonsList[0].moveTo();
        browser.buttonDown();
        info(`new location: ${minSliderLoc['x'] + minChange}`);
        sliderButtonsList[0].moveTo(minSliderLoc['x'] + minChange);
        browser.buttonUp();
        break;
      case 'max':
        sliderButtonsList[1].moveTo();
        browser.buttonDown();
        info(`new location: ${maxSliderLoc['x'] - maxChange}`);
        sliderButtonsList[1].moveTo(maxSliderLoc['x'] - maxChange);
        browser.buttonUp();
        break;
      case 'both':
        sliderButtonsList[0].moveTo();
        browser.buttonDown();
        info(`new location: ${minSliderLoc['x'] + minChange}`);
        sliderButtonsList[0].moveTo(minSliderLoc['x'] + minChange);
        browser.buttonUp();
        browser.pause(1000);
        sliderButtonsList[1].moveTo();
        browser.buttonDown();
        info(`new location: ${maxSliderLoc['x'] - maxChange}`);
        sliderButtonsList[1].moveTo(maxSliderLoc['x'] - maxChange);
        browser.buttonUp();
        break;
      default:
        throw new Error(`Incorrect possible selections provided: ${testFilter.priceRangeSelection}`);
    }
  }

  get sliderButtons() {
    return this.$$('[data-auto="priceSlidePoints"]').map((element) => new BaseElement(element));
  }

  get dropdownItemslist() {
    return new BaseElement('menu-item-root');
  }
}
