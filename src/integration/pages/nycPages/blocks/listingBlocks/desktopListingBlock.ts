import { info } from '../../../../utils/logUtils';
import SaveSearchToggle from '../../../elements/saveSearchToggle';
import CommonListingBlock from '../../../commonPages/blocks/listingBlocks/commonListingBlock';
import BaseElement from '../../../baseElement';

export default class DesktopListingBlock extends CommonListingBlock {
  readonly saveSearchToggle = new SaveSearchToggle('listing-bulletins');

  tryCloseSaveAlert() {
    try {
      this.closeSaveSearchButton.waitForExist(8000);
      this.closeSaveSearchButton.waitForDisplayed(8000);
      this.closeSaveSearchButton.waitAndClick();
    } catch (e) {
      info('Save search alert is not exist on list page');
    }
  }

  private get closeSaveSearchButton() {
    return new BaseElement('close-save-search-icon');
  }
}
