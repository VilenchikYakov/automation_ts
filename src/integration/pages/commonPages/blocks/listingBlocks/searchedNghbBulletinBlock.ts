import CommonBulletinBlock from './commonBulletinBlock';

export default class SearchedNghbBulletinBlock extends CommonBulletinBlock {
  constructor(bulletinElement?: string | WebdriverIO.Element) {
    super(bulletinElement ? bulletinElement : 'listed-bulletin');
  }
}
