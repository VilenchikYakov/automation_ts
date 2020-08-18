import BaseElement from '../../../baseElement';

export default class DesktopInsightFooter extends BaseElement {
  constructor() {
    super('insight-controllers-root');
  }

  getUpdates() {
    this.getUpdatesButton.waitAndClick();
  }

  nextInsight() {
    this.nextInsightButton.waitAndClick();
  }

  prevInsight() {
    this.prevInsightButton.waitAndClick();
  }

  get nextInsightButton() {
    return new BaseElement('insight-controller-next');
  }

  get prevInsightButton() {
    return new BaseElement('insight-controller-prev');
  }

  get getUpdatesButton() {
    return new BaseElement('get-updates-button');
  }
}
