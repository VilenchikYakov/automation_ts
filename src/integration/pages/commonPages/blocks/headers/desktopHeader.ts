import CommonHeader from './commonHeader';
import BaseElement from '../../../baseElement';
import DesktopUserMenuDD from '../dropDowns/desktopUserMenuDD';
import DesktopUserActionMenu from '../popUps/desktopUserActionMenu';

export default class DesktopHeader extends CommonHeader {
  readonly userMenuDD = new DesktopUserMenuDD();
  readonly userActionMenu = new DesktopUserActionMenu();

  constructor() {
    super('desktop-header-wrapper');
  }

  openSignUpPopUp() {
    this.signUpButton.waitAndClick();
  }

  openFeedTab() {
    this.feedLink.waitAndClick();
  }

  openShortListTab() {
    this.shortListLink.waitAndClick();
  }

  openMyHomeTab() {
    this.myHomeLink.waitAndClick();
  }

  openUserDropDown() {
    this.userMenu.waitAndClick();
  }

  logOut() {
    this.openUserDropDown();
    this.userMenuDD.logOut();
  }

  get shortListLink() {
    return new BaseElement('shortlist-link');
  }

  get feedLink() {
    return new BaseElement('feed-link');
  }

  get myHomeLink() {
    return new BaseElement('myHomes-link');
  }

  get userMenu() {
    return new BaseElement('user-menu');
  }

  get signUpButton() {
    return new BaseElement('[data-auto="signup-trigger"]');
  }
}
