import BaseElement from '../../../baseElement';
import { info, warn } from '../../../../utils/logUtils';
import { arraysEqual } from '../../../../utils/generalUtils';
import CommonTransportationBlock from '../../../commonPages/blocks/commonBlocks/commonTransportationBlock';

export default class TransportationBlock extends CommonTransportationBlock {
  openCommutePopUp() {
    this.addCommuteButton.scrollIntoView({ block: 'center', inline: 'nearest' });
    this.addCommuteButton.waitForClickable();
    this.addCommuteButton.click();
  }

  getCommutesTexts(): string[] {
    const commutes = this.commuteItemsList;
    if (commutes.length === 0) {
      return [];
    }
    const commuteTexts = commutes.map((commute) => commute.getText());
    info(`commuteTexts: ${commuteTexts} - count: ${commuteTexts.length}`);
    return commuteTexts;
  }

  waitUntilCommutesRefreshed(commutesTextsBeforeSearch: string[], maxChecks?: number) {
    let commutesAfterSearch: string[], counter: number;
    if (!maxChecks) {
      maxChecks = 15;
    }
    info(`provided commutes count: ${commutesTextsBeforeSearch.length}`);
    info(`starting to wait untillcommutes are refreshed for maximum ${maxChecks} times of 1 sec time wait`);
    for (counter = 0; counter < maxChecks; counter++) {
      browser.pause(1000);
      commutesAfterSearch = this.getCommutesTexts();
      info(`check ${counter} - suggestionsAfterSearch: ${commutesAfterSearch} - count: ${commutesAfterSearch.length}`);
      if (commutesTextsBeforeSearch.length !== commutesAfterSearch.length) {
        info(
          `check: ${counter}, number of commutes before adding new is not equal to the number of com mutes after adding new one => commutes refreshed`,
        );
        break;
      } else {
        if (!arraysEqual(commutesTextsBeforeSearch, commutesAfterSearch)) {
          info(
            `check: ${counter}, texts of commutes before adding new one are not equal to the texts of commutes after adding new one => commutes refreshed`,
          );
          break;
        } else {
          warn(
            `check ${counter} -  texts of commutes before adding new one are equal to the texts of commutes after adding new one continue to wait 1 sec and check again`,
          );
        }
      }
      if (counter === maxChecks) {
        throw new Error(`Commutes are nor refreshed after full cycle of wait operation`);
      }
    }
  }

  get addCommuteButton() {
    return new BaseElement('add-commute');
  }

  get commuteItemsList() {
    this.firstCommute.optionalWaitForExist(10000);
    return this.$$('[data-auto="commute-item"]').map((element) => new BaseElement(element));
  }

  get firstCommute() {
    return new BaseElement('commute-item');
  }
}
