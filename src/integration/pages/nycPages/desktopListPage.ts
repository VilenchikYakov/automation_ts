import CommonListPage from '../commonPages/commonListPage';
import { params } from '../../configs/config';
import DesktopListingBlock from './blocks/listingBlocks/desktopListingBlock';
import DesktopListHeader from './blocks/headers/desktopListHeader';
import SaveSearchBlock from './blocks/saveSearchBlock/saveSearchBlock';
import CommonPaginationBlock from '../commonPages/blocks/listingBlocks/commonPaginationBlock';
import { entryAddressString } from '../../data/generalData';
import DesktopHeader from '../commonPages/blocks/headers/desktopHeader';
import { iOpenParams } from '../../interfaces';

class DesktopListPage extends CommonListPage {
  readonly header = new DesktopHeader();
  readonly listHeader = new DesktopListHeader();
  readonly listingBlock = new DesktopListingBlock();
  readonly paginationBlock = new CommonPaginationBlock();
  readonly saveSearchBlock = new SaveSearchBlock();

  openAndWaitForBulletins(openParams: iOpenParams = { urlSuffix: entryAddressString[params.city][params.env].rent }) {
    this.open(openParams);
    this.listingBlock.waitBulletinsBlock();
  }
}

export default new DesktopListPage();
