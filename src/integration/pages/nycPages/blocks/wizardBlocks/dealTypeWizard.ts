import { info, warn } from '../../../../utils/logUtils';
import { getRandomBoolean, getRandomItemOutOfArray, isMobileDeviceInUse } from '../../../../utils/generalUtils';
import BaseElement from '../../../baseElement';
import CommonWizard from '../../../commonPages/blocks/wizardBlock/commonWizard';
import SearchInput from '../../../elements/searchInput';
import { iButton } from '../../../../interfaces';

export default class DealTypeWizard extends CommonWizard {
  /**
   * Set value in address search input or click on skip button
   * @param {string} value
   * @param {boolean} overlay, if true, use overlay input (mobile device)
   * @returns { isSkip: true } |
   * { suggestionType: string | { isSkip: boolean }, isSkip: false }, suggestionText: string }
   */
  skipOrSetAddress(value: string, overlay: boolean = false): any {
    if (getRandomBoolean()) {
      info('Skip set address in DealTypeWizard');
      this.skipButton.waitAndClick();
      return { isSkip: true };
    }
    return this.addressSearchInput.setValueAndChooseRandomSuggestion(value, overlay);
  }

  get buyButton() {
    return isMobileDeviceInUse() ? new BaseElement('buy-button') : new BaseElement('buy-button', this.self);
  }

  get rentButton() {
    return isMobileDeviceInUse() ? new BaseElement('rent-button') : new BaseElement('rent-button', this.self);
  }

  get addressSearchInput() {
    return new SearchInput(this.selector);
  }
}
