import BaseElement from '../../baseElement';
import SearchInput from '../../elements/searchInput';

export default class MobileExploreHomeBottomBlock extends BaseElement {
  constructor() {
    super('check-found-home-block');
  }

  exploreHome(value: string) {
    this.expandBlock();

    this.exploreAddressInput.setValueAndChooseRandomSuggestion(value);
  }

  clickOnInsightCard(cardNumber: number = 1, seeAllCard: boolean = false) {
    this.waitUntilInsightCardsIsVisible(cardNumber);
    const card = seeAllCard ? this.seeAllInsightCard : this.insightCards[cardNumber - 1];
    card.scrollIntoView();
    card.waitAndClick();
  }

  waitUntilInsightCardsIsVisible(amount: number = 3) {
    browser.waitUntil(() => this.insightCards.length >= amount, {
      timeout: 15000,
      timeoutMsg: `Amount insight cards must be more or equal: ${amount}, not ${this.insightCards.length}`,
    });
  }

  expandBlock() {
    this.expandBlockButton.waitAndClick();
  }

  get exploreAddressInput() {
    return new SearchInput(this.selector);
  }

  get insightCards(): BaseElement[] {
    return this.insightCardsList.map((element) => new BaseElement(element));
  }

  get insightCardsList() {
    return $$('[data-auto="insight-card-wrapper-outer"] .insight-card');
  }

  get insightCardsBlock() {
    return new BaseElement('bulletin-images');
  }

  get seeAllInsightCard() {
    return new BaseElement('see-all-insight-card');
  }

  get expandBlockButton() {
    return new BaseElement('check-found-home-button');
  }
}
