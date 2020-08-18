import BasePage from '../basePage';
import AfterWizardPopUp from '../commonPages/blocks/popUps/afterWizardPopUp';
import { entryAddressString } from '../../data/generalData';
import { params } from '../../configs/config';
import { iOpenParams } from '../../interfaces';

export default class CommonListPage extends BasePage {
  readonly afterWizardPopUp = new AfterWizardPopUp();
  private _entryAddressString = entryAddressString[params.city];

  open(openParams: iOpenParams = { urlSuffix: this._entryAddressString[params.env].rent }) {
    super.open(openParams);
  }

  closePopUp() {
    this.afterWizardPopUp.waitClosePopUp();
  }
}
