import BaseElement from '../../../baseElement';
import { info } from '../../../../utils/logUtils';
import elementsUtils from '../../../../utils/elementsUtils';

export default class MobileListFooter extends BaseElement {
  constructor() {
    super('search-bottom-root');
  }
  switchToMap() {
    this.isMapView() ? info('Already in "map" state, no need to switch') : this.mapListViewButton.waitAndClick();
  }

  switchToList() {
    !this.isMapView() ? info('Already in "list" state, no need to switch') : this.mapListViewButton.waitAndClick();
  }

  isMapView() {
    return elementsUtils.getState(this.mapListViewButton.selector) === 'map';
  }

  saveSearch() {
    this.isSearchSaved() ? info('The search has been already saved') : this.saveSearchButton.waitAndClick();
  }

  unSaveSearch() {
    !this.isSearchSaved() ? info('The search has been already unsaved') : this.saveSearchButton.waitAndClick();
  }

  isSearchSaved() {
    return elementsUtils.isActiveBySelector(this.saveSearchButton.selector);
  }

  get mapListViewButton() {
    return new BaseElement('map-list-view-button', this.self);
  }

  get saveSearchButton() {
    return new BaseElement('save-search-button', this.self);
  }
}
