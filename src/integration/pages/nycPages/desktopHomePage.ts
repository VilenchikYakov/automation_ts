import CommonHomePage from './commonHomePage';
import DesktopHeader from '../commonPages/blocks/headers/desktopHeader';
import { info } from '../../utils/logUtils';

class DesktopHomePage extends CommonHomePage {
  readonly header = new DesktopHeader();

  skipWizard() {
    info('opreating home page wizard');
    this.dealTypeWizard.skipHPWizard();
    this.filterWizard.skipHPWizard();
    this.powerSortWizard.skipHPWizard();
    this.commuteWizard.submitButton.waitAndClick();
  }
}

export default new DesktopHomePage();
