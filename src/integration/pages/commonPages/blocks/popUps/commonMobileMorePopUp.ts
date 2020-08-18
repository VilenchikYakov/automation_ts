import BaseElement from '../../../baseElement';

export default class commonMobileMorePopUp extends BaseElement {
  openAccountSettingsPage() {
    this.accountSettingsLink.waitAndClick();
  }

  private get accountSettingsLink() {
    return new BaseElement('mobile-user-info');
  }
}
