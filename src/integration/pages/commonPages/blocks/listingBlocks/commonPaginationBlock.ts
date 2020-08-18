import BaseElement from '../../../baseElement';

export default class CommonPaginationBlock extends BaseElement {
  constructor() {
    super('bulletins-pagination');
  }

  previousPage() {
    this.previousButton.waitAndClick();
  }

  nextPage() {
    this.nextButton.waitAndClick();
  }

  private get previousButton(): BaseElement {
    return new BaseElement('bulletins-pagination-prev');
  }

  private get nextButton(): BaseElement {
    return new BaseElement('bulletins-pagination-next');
  }

  get pagesButtons(): BaseElement[] {
    return $$('[data-auto^="bulletins-pagination-page-"]').map((element) => new BaseElement(element));
  }
}
