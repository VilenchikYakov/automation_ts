import BasePage from '../basePage';
import CommonUgc from './blocks/popUps/commonUgc';
import { iOpenParams } from '../../interfaces';

export default class CommonAddressPage extends BasePage {
  readonly ugc = new CommonUgc();

  open(openParams?: iOpenParams) {
    openParams.urlSuffix = openParams.urlSuffix.startsWith('/address/')
      ? openParams.urlSuffix
      : '/address/' + openParams.urlSuffix;
    super.open(openParams);
    this.ugc.bypassUgc();
  }
}
