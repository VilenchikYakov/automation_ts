import { automationTags } from '../../../../data/webElementData';
import { info, warn, debug } from '../../../../utils/logUtils';
import BaseElement from '../../../baseElement';
import CommonBulletinBlock from './commonBulletinBlock';
import SearchedNghbBulletinBlock from './searchedNghbBulletinBlock';
import NearbyNghbBulletinBlock from './nearbyNghbBulletinBlock';
import { BULLETIN_TYPES } from '../../../../configs/generalConfig';
import { getRandomItemOutOfArray } from '../../../../utils/generalUtils';
import { iSelectBulletin } from '../../../../interfaces';

export default class CommonListingBlock extends BaseElement {
  constructor() {
    super('listing-bulletins-block');
  }

  getBulletinsResult(): CommonBulletinBlock[] {
    this.waitBulletinsBlock();
    const bulletins = this.bulletinsList;
    info(`Current page contains ${bulletins.length} bulletins`);
    return bulletins;
  }
  getSearchedBulletinsResult(): CommonBulletinBlock[] {
    const searchedBulletins = this.bulletinsSearchedNghb;
    info(`Current page contains ${searchedBulletins.length} searched bulletins`);
    return searchedBulletins;
  }

  getBulletinWithoutResult(filterType: string): CommonBulletinBlock {
    const bulletins = this.getBulletinsResult();
    return bulletins.find((bulletin) => !bulletin.$(filterType).isExisting());
  }

  getFilteredBulletinWithoutInsights() {
    return this.getBulletinWithoutResult(this.firstBulletin.insightImpactCard.selector);
  }

  waitLoadBulletinsList(address: string) {
    browser.waitUntil(() => this.bulletinsTitle.getText().toLowerCase().includes(address.toLowerCase()), {
      timeout: 10000,
      timeoutMsg: `Bulletins list title: ${this.bulletinsTitle.getText()} does not exist ${address}`,
    });
    //  this.waitBulletinsBlock();
  }
  // @TODO implement logic with 'NO RESULTS" case. Decrease wait timeout if possible
  waitBulletinsBlock() {
    this.firstBulletin.optionalWaitForExist(3000, true);
    this.firstBulletin.optionalWaitForExist(3000);
    const resultCount = this.getTotalBulletinsCount();
    const amountElement = resultCount > 50 ? 50 : resultCount;
    info(`amountElement: ${amountElement} - resultCount: ${resultCount}`);
    browser.waitUntil(() => this.bulletinsList.length >= amountElement, {
      timeout: 10000,
      timeoutMsg: `Bulletins list result count: ${this.bulletinsList.length}, should be: ${amountElement}`,
    });
  }

  scrollToLastBulletin() {
    const bulletinsList = this.getBulletinsResult();
    bulletinsList[bulletinsList.length - 1].scrollIntoView();
  }

  getBulletinsResultCount(): number {
    this.bulletinsTitleBlock.waitForDisplayed();
    const count = this.bulletinsList.length;
    info(`Bulletins result count: ${count}`);
    return count;
  }

  getTotalBulletinsCount(): number {
    this.bulletinsTitleBlock.waitForDisplayed();
    const totalCount = this.bulletinsTitleBlock.getAttribute(automationTags.dataAutoBulletinsCount);
    info(`Bulletins total count: ${totalCount}`);
    return parseInt(totalCount);
  }

  getBulletinsDealType(): string {
    this.bulletinsTitle.waitForDisplayed();
    const dealType = this.bulletinsTitle.getAttribute(automationTags.dataAutoDealType);
    info(`Bulletins deal type: ${dealType}`);
    return dealType;
  }

  openFirstBulletin() {
    this.waitBulletinsBlock();
    info(`first bulletin ID: ${this.firstBulletin.getBulletinID()}`);
    this.firstBulletin.openBulletin();
  }

  sortBy(option: string): boolean {
    if (this.getTotalBulletinsCount() === 0) {
      warn(`No sort element is available as 0 bulletins on the page`);
      return false;
    } else {
      this.sortButton.waitAndClick();
      new BaseElement(`[data-auto-sort-name="${option}"]`).waitAndClick();
      return true;
    }
  }

  getBulletinsPricesList(): number[] {
    const priceRegex = /\d+/g;
    info('Collecting prices list from collected bulletins');
    const prices = this.priceList.map((price) => parseInt(price.match(priceRegex).join('')));
    info(`PricesList of collected bulletins: ${prices}`);
    return prices.length > 0 ? prices : [];
  }

  openRandomBulletin(bulletinToSelect?: iSelectBulletin) {
    const bulletinType = bulletinToSelect?.bulletinType || BULLETIN_TYPES.bulletin;
    const manuallyCratedBulletin = bulletinToSelect?.manuallyCratedBulletin || false;
    const searchedNghbBulletins = bulletinToSelect?.searchedNghbBulletins || false;
    info(
      `provided params: ${bulletinType} - manuallyCreatedBulletins: ${manuallyCratedBulletin} - searchedNghb: ${searchedNghbBulletins}`,
    );
    let randBulletin: CommonBulletinBlock;
    const collectedBulletins = !searchedNghbBulletins ? this.getBulletinsResult() : this.getSearchedBulletinsResult();
    if (collectedBulletins.length > 0) {
      const bulletinsOfType = collectedBulletins.filter((bulletin) => bulletin.bulletinType === bulletinType);
      if (bulletinsOfType.length === 0) {
        throw new Error(`No bulletins of type ${bulletinsOfType} collected`);
      }
      if (manuallyCratedBulletin) {
        info(`ids: ${bulletinsOfType.map((bulletin) => bulletin.getBulletinID())}`); // to see the collected bulletinsIds in case of error
        const mBulletins: CommonBulletinBlock[] = bulletinsOfType.filter((bulletin) =>
          bulletin.getBulletinID().startsWith('m'),
        );
        randBulletin = getRandomItemOutOfArray(mBulletins);
      } else {
        randBulletin = getRandomItemOutOfArray(bulletinsOfType);
      }

      info(`selected bulletin: ${randBulletin.getBulletinID()}`);
      randBulletin.waitAndClick();
    } else {
      throw new Error(`No bulletins collected, unable to select random bulletin of type ${bulletinType}`);
    }
  }

  getBulletinIDs(includeNearby: boolean = true): string[] {
    const bulletinIDs = [];
    let collectedBulletins;
    collectedBulletins = includeNearby ? this.getSearchedBulletinsResult() : this.getBulletinsResult();
    if (collectedBulletins.length > 0) {
      this.bulletinsList.forEach((bulletin) => {
        const bulletinID = bulletin.getBulletinID();
        bulletinIDs.push(bulletinID);
      });
      info(`total bulletinIDs collected - ${bulletinIDs.length}`);
      info(`Collected bulletinIDs from page ${bulletinIDs}`);
      return bulletinIDs;
    } else {
      throw new Error(`No bulletins collected, unable to select bulletinIDs`);
    }
  }
  getBulletinsTypes(): string[] {
    info('collecting opened bulletins type value');
    const collectedBulletins = this.getBulletinsResult();
    if (collectedBulletins.length > 0) {
      const bulletinsTypes = collectedBulletins.map((bulletin) => bulletin.bulletinType);
      info(`collected bulletinTypes: ${bulletinsTypes}`);
      return bulletinsTypes;
    } else {
      throw new Error(`No bulletins collected, unable to collect types of bulletin`);
    }
  }

  additionalSchoolInfo() {
    this.schoolAdditionalInfoLink.waitAndClick();
  }

  manuallyCreatedBulletins(): CommonBulletinBlock[] {
    this.waitBulletinsBlock();
    let mBulletins: CommonBulletinBlock[] = [];
    const collectedBulletins = this.bulletinsList;
    if (collectedBulletins.length > 0) {
      mBulletins = collectedBulletins.filter((bulletin) => bulletin.getBulletinID().startsWith('m'));
      info(`manuallyCreatedBulletins: ${mBulletins}`);
      return mBulletins;
    } else {
      throw new Error(`No bulletins collected, unable to select bulletinIDs`);
    }
  }

  get bulletinsList(): CommonBulletinBlock[] {
    info('collecting bulletins of opened page');
    const searchedBulletins = this.bulletinsSearchedNghb;
    info(`number of bulletins of searched nghb: ${searchedBulletins.length}`);
    if (searchedBulletins.length === 50) {
      return searchedBulletins;
    }
    const nearBulletins = this.bulletinsNearbyNghb;
    info(`number of bulletins from nearbyNghbs: ${nearBulletins.length}`);
    info(`total bulletins on page count: ${searchedBulletins.length + nearBulletins.length}`);
    return searchedBulletins.concat(nearBulletins);
  }

  get bulletinsTitle() {
    return new BaseElement('deal-type');
  }

  get bulletinsTitleBlock() {
    return new BaseElement('filterApplyResult');
  }

  get listingCountText() {
    return new BaseElement('listing-count');
  }
  get priceList(): string[] {
    const bulletinsList: CommonBulletinBlock[] = this.getBulletinsResult();
    const bulletinsPrices: string[] = [];
    bulletinsList.forEach((bulletin: CommonBulletinBlock) => {
      if (bulletin.bulletinType === 'bulletin') {
        bulletinsPrices.push(bulletin.bulletinDetails.bulletinPrice.getText());
      }
    });
    return bulletinsPrices;
  }

  get sortButton() {
    return new BaseElement('sort-selector');
  }

  get impactList() {
    return $$('[data-auto="insight-impact-list"]');
  }
  get firstBulletin() {
    return this.firstBulletinSearchedNghb || this.firstBulletinNearbyNghb;
  }

  get firstBulletinSearchedNghb() {
    return new SearchedNghbBulletinBlock();
  }

  get firstBulletinNearbyNghb() {
    return new NearbyNghbBulletinBlock();
  }

  get bulletinSearchedNghbElementsList() {
    return $$('[data-auto="listed-bulletin"]');
  }

  get bulletinNearbyNghbElementsList() {
    return $$('[data-auto="listed-bulletin-nearby"]');
  }

  get bulletinsSearchedNghb() {
    this.firstBulletinSearchedNghb.optionalWaitForExist(3000);
    return this.bulletinSearchedNghbElementsList.map((element) => new SearchedNghbBulletinBlock(element));
  }

  get bulletinsNearbyNghb() {
    this.firstBulletinNearbyNghb.optionalWaitForExist(3000);
    return this.bulletinNearbyNghbElementsList.map((element) => new NearbyNghbBulletinBlock(element));
  }

  get schoolAdditionalInfoLink() {
    return new BaseElement(this.bulletinsTitleBlock.$('a'));
  }
}
