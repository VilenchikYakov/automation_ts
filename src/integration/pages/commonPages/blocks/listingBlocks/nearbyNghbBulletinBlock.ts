import CommonBulletinBlock from './commonBulletinBlock';

export default class NearbyNghbBulletinBlock extends CommonBulletinBlock {
  constructor(bulletinElement?: string | WebdriverIO.Element) {
    super(bulletinElement ? bulletinElement : 'listed-bulletin-nearby');
  }
}
