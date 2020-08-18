import BaseElement from '../../../baseElement';
export default class DesktopUserActionMenu extends BaseElement {
  constructor() {
    super('user-action-menu');
  }

  get userEmail() {
    return new BaseElement('user-email');
  }

  get actionProfile() {
    return new BaseElement('action-profile');
  }

  get actionSavedSearches() {
    return new BaseElement('action-savedSearches');
  }
}
