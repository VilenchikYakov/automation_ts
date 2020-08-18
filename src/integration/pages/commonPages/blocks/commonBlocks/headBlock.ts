import BaseElement from '../../../baseElement';
import { warn } from '../../../../utils/logUtils';

export default class HeadBlock extends BaseElement {
  constructor() {
    super($('head'));
  }

  metaDescriptionContent() {
    return this.metaDescription.getAttribute('content');
  }

  linkCanonicalHref() {
    if (this.linkCanonical.optionalWaitForExist(5000)) {
      return this.linkCanonical.getAttribute('href');
    } else {
      warn(`Opened page doesn't contans canonical link, return empty string`);
      return '';
    }
  }

  get metaDescription() {
    return new BaseElement($('[name="description"]'), this.self);
  }

  get linkCanonical() {
    return new BaseElement($('[rel="canonical"]'), this.self);
  }
}
