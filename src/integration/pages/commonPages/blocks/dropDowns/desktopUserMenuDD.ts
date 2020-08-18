import BaseElement from '../../../baseElement';

export default class DesktopUserMenuDD extends BaseElement {
  openAccountSettingsPage() {
    this.accountSettingsButton.waitAndClick();
  }
  logOut() {
    this.logOutButton.waitAndClick();
  }

  private get accountSettingsButton() {
    return new BaseElement('action-profile');
  }
  private get logOutButton() {
    return new BaseElement('action-log-out');
  }
}
