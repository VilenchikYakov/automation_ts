import BaseElement from '../../../baseElement';
import { automationTags } from '../../../../data/webElementData';
import { info } from '../../../../utils/logUtils';
import BulletinDetailsBlock from '../commonBlocks/billetinDetailsBlock';

export default class CommonBulletinBlock extends BaseElement {
  constructor(bulletinElement: string | WebdriverIO.Element) {
    super(bulletinElement);
  }

  readonly bulletinDetails = new BulletinDetailsBlock(this.self);

  openBulletin() {
    this.clickablePart.waitAndClick();
    browser.waitUntil(() => browser.getUrl().includes('/listing') || browser.getUrl().includes('/project'), {
      timeout: 10000,
      timeoutMsg: `Did not open unit page. The current url: '${browser.getUrl()}' don't include: /listing or /project`,
    });
  }

  getPercentMatchLabel() {
    this.matchLabel.waitForDisplayed();
    return this.matchLabel.getText().match(/\d+/g)[0];
  }

  getBulletinFullAddress() {
    const fullAddress = [];
    this.bulletinDetails.bulletinAddress.$$('*').forEach((element) => fullAddress.push(element.getText()));
    return fullAddress;
  }

  setBookmark() {
    info(
      `clicking on favorite button on bulletin ID '${this.getBulletinID()}' with address '${this.getBulletinFullAddress()}'`,
    );
    this.favoriteButton.waitAndClick();
  }

  isBookmarked() {
    return this.favoriteButton.getAttribute(automationTags.dataAutoActive);
  }

  getBulletinID(): string {
    return this.getAttribute(automationTags.dataAutoBulletinId);
  }
  getBulletinIdBySearchedText(text: string) {
    const address = this.bulletinDetails.bulletinAddress.getText();
    const id = address.includes(text) ? this.getBulletinID() : null;
    return id;
  }

  get matchLabel() {
    return new BaseElement('match-label', this.self);
  }

  get bulletinType(): string {
    return this.getAttribute(automationTags.dataAutoBulletinType);
  }

  get insightImpactList() {
    return new BaseElement('insight-impact-list', this.self);
  }

  get insightImpactCard() {
    return new BaseElement('insight-impact-card');
  }

  get insightImpactMore() {
    return new BaseElement('insight-impact-more', this.self);
  }

  get favoriteButton() {
    return new BaseElement('bulletin-favorite-button', this.self);
  }

  get bulletinDate() {
    return new BaseElement('date-label', this.self);
  }

  get matchPriorityEducation() {
    return new BaseElement(`${this.selector} [type="education"]`);
  }

  get matchPriorityPrices() {
    return new BaseElement(`${this.selector} [type="prices"]`);
  }

  get matchPriorityTransportation() {
    return new BaseElement(`${this.selector} [type="transportation"]`);
  }

  get matchPriorityLivability() {
    return new BaseElement(`${this.selector} [type="livability"]`);
  }

  get matchPriorityPlanning() {
    return new BaseElement(`${this.selector} [type="planning"]`);
  }

  get matchPrioritySafety() {
    return new BaseElement(`${this.selector} [type="safety"]`);
  }

  get matchPriorityNuisances() {
    return new BaseElement(`${this.selector} [type="nuisances"]`);
  }

  get matchPriorityNaturalLight() {
    return new BaseElement(`${this.selector} [type="naturalLight"]`);
  }

  get clickablePart() {
    return new BaseElement('universal-card-thumbnail-wrapper', this.self);
  }
}
