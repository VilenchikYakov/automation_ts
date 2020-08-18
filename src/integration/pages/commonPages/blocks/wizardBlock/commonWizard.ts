import { isMobileDeviceInUse } from '../../../../utils/generalUtils';
import BaseElement from '../../../baseElement';
import { info } from '../../../../utils/logUtils';

export default class CommonWizard extends BaseElement {
  constructor() {
    super('overlayRoot'); // changed due to missing id at mobile device
  }

  //  TODO - this function should be removed as soosn as HP tests are rewritten
  goBackWizardToStart() {
    const amount = isMobileDeviceInUse() ? 4 : 3;
    this.goBackWizard(amount);
  }

  //  TODO - this function should be removed as soosn as HP tests are rewritten
  goBackWizard(amount: number = 1) {
    for (let i = 0; i < amount; i += 1) {
      this.backButton.waitAndClick();
    }
  }

  //  TODO - this function should be removed as soosn as HP tests are rewritten
  goNextWizard(isSkip: boolean, amount: number = 1) {
    for (let i = 0; i < amount; i += 1) {
      if (isSkip) {
        this.skipButton.waitAndClick();
      } else {
        this.nextButton.waitAndClick();
      }
    }
  }

  submit() {
    this.submitButton.waitAndClick();
  }

  skipHPWizard() {
    info(`perform click to perform skip wizard page`);
    if (this.skipButton.optionalWaitForExist(2500)) {
      info(`click skip button to move to next page`);
      this.skipButton.waitAndClick();
    } else if (this.nextButton.optionalWaitForExist(2500)) {
      info(`click next button to move to next page`);
      this.nextButton.waitAndClick();
    } else if (this.submitButton.optionalWaitForExist(2500)) {
      info(`click submit button to move to next page`);
      this.submitButton.waitAndClick();
    } else {
      throw new Error('Skip nor next nor submit button exists, unable to continue');
    }
  }

  get skipButton() {
    return new BaseElement('skip-button', this.self);
  }

  get nextButton() {
    return new BaseElement('next-button', this.self);
  }

  get backButton() {
    return new BaseElement('back-button', this.self);
  }

  get submitButton() {
    return new BaseElement('submit-button', this.self);
  }
}
