import BasePage from '../basePage';
import InsightFooter from '../commonPages/blocks/footers/desktopInsightFooter';
import BaseElement from '../baseElement';
import CommonFeedbackPopUp from './blocks/popUps/commonFeedbackPopUp';

class DesktopInsightPage extends BasePage {
  readonly insightFooter = new InsightFooter();
  readonly commonFeedbackPopUp = new CommonFeedbackPopUp();

  openFeedback() {
    this.feedbackButton.waitAndClick();
  }

  get tradeoffContainer() {
    return new BaseElement('desktop-opened-tradeoff');
  }

  private get feedbackButton() {
    return new BaseElement('give-feedback');
  }

  get sentFeedback() {
    return new BaseElement('sent-feedback-wrapper');
  }
}

export default new DesktopInsightPage();
