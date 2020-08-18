import OverviewHeaderBlock from './overviewHeaderBlock';
import BaseElement from '../../../baseElement';

export default class DesktopOverviewHeaderBlock extends OverviewHeaderBlock {
  followAddressFromGallery() {
    this.galleryFollowButton.waitAndClick();
  }

  get galleryFollowButton() {
    return new BaseElement('address-gallery-follow-button');
  }
}
