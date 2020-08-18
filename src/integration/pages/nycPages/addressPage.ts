import { params } from '../../configs/config';
import { entryAddressString } from '../../data/generalData';
import CommonAddressFooter from '../commonPages/blocks/footers/commonAddressFooter';
import ProsAndConsBlock from './blocks/commonBlocks/prosAndConsBlock';
import CommonAddressPage from '../commonPages/commonAddressPage';
import BaseElement from '../baseElement';
import { iOpenParams } from '../../interfaces';
import GreatSchoolBlock from './blocks/addressBlocks/greatSchoolBlock';

export default class AddressPage extends CommonAddressPage {
  readonly prosAndConsBlock = new ProsAndConsBlock();
  readonly commonAddressFooter = new CommonAddressFooter();
  readonly schoolsBlock = new GreatSchoolBlock();

  open(openParams: iOpenParams = { urlSuffix: entryAddressString[params.city][params.env].check }) {
    super.open(openParams);
  }

  openAndWaitForInsights(openParams: iOpenParams = { urlSuffix: entryAddressString[params.city][params.env].check }) {
    this.open(openParams);
    this.prosAndConsBlock.lastCardButton.waitForExist();
  }

  followAddress() {
    this.followButton.scrollIntoView({ block: 'center' });
    this.followButton.waitAndClick();
  }

  get followButton() {
    return new BaseElement('follow-button');
  }
}
