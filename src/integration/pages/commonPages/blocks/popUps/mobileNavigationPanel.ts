import BaseElement from '../../../baseElement';

export default class CommonMobileNavigationPanel extends BaseElement {
  constructor() {
    super('search-bottom-root');
  }

  openShortListTab() {
    this.shortListLink.waitAndClick();
  }

  openMoreTab() {
    this.moreLink.waitAndClick();
  }

  openMyHomeTab() {
    this.myHomeLink.waitAndClick();
  }

  openMyProfileTab() {
    this.myProfileLink.waitAndClick();
  }

  openSignUpPopUp() {
    this.signLink.waitAndClick();
  }

  openSearch() {
    this.searchLink.waitAndClick();
  }

  clickFeedNavigationLink() {
    this.feedNavigationLink.waitAndClick();
  }

  clickSearchNavigationLink() {
    this.searchNavigationLink.waitAndClick();
  }

  clickShortListNavigationLink() {
    this.shortListNavigationLink.waitAndClick();
  }

  get moreLink() {
    return new BaseElement('mobile-navigation-menu');
  }

  get shortListLink() {
    return new BaseElement('mobile-navigation-shortlist');
  }

  get myHomeLink() {
    return new BaseElement('mobile-navigation-homes');
  }

  get myProfileLink() {
    return new BaseElement('mobile-navigation-me');
  }

  get signLink() {
    return new BaseElement('mobile-navigation-signIn');
  }

  get searchLink() {
    return new BaseElement('mobile-navigation-search');
  }

  get feedNavigationLink() {
    return new BaseElement('link-feed');
  }

  get searchNavigationLink() {
    return new BaseElement('link-search');
  }

  get shortListNavigationLink() {
    return new BaseElement('link-shortlist');
  }
}
