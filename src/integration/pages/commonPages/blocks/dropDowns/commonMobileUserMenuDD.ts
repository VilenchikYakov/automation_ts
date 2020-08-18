import BaseElement from '../../../baseElement';

export default class CommonMobileUserMenuDD extends BaseElement {
  constructor() {
    super('mobile-user-menu-wrapper');
  }
  openAccountSettingsPage() {
    this.personalInfoLink.waitAndClick();
  }
  logOut() {
    this.logOutButton.waitAndClick();
  }

  userEmail(): string {
    return this.userEmailElement.getText();
  }

  private get personalInfoLink() {
    return new BaseElement('personal-info-link');
  }
  private get logOutButton() {
    return new BaseElement('mobile-log-out');
  }

  private get userEmailElement() {
    return new BaseElement('user-email');
  }
}
