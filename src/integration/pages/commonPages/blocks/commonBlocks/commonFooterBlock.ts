import BaseElement from '../../../baseElement';

export default class CommonFooterBlock extends BaseElement {
  constructor() {
    super('Footer-block');
  }

  breadcrumbsLinksTexts(): string[] {
    return this.breadcrumbsLinks.map((link) => link.getAttribute('href'));
  }

  get breadcrumbs() {
    return new BaseElement('breadcrumbs');
  }

  get breadcrumbsLinks() {
    return this.breadcrumbs.$$('[data-auto="breadcrumb-link"]');
  }

  get footers() {
    return new BaseElement('footers');
  }
}
