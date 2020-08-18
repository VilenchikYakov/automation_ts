import { ROOT_SELECTOR, automationTags } from '../data/webElementData';
import elementsUtils from './elementsUtils';

export default {
  waitPartUrl(partUrl: string, timeout: number = 10000) {
    browser.waitUntil(() => browser.getUrl().includes(partUrl), {
      timeout: timeout,
      timeoutMsg: `The current url: '${browser.getUrl()}' don't include: ${partUrl}`,
    });
  },

  waitUrl(url: string, timeout: number = 10000) {
    browser.waitUntil(() => browser.getUrl() === url, {
      timeout: timeout,
      timeoutMsg: `The current url: '${browser.getUrl()}' is wrong, should be: ${url}`,
    });
  },

  waitIsActive(selector: string, timeout: number = 10000) {
    browser.waitUntil(() => elementsUtils.isActiveBySelector(selector), {
      timeout: timeout,
      timeoutMsg: `Element: ${selector} is not active`,
    });
  },

  waitIsNotActive(selector: string, timeout: number = 10000) {
    browser.waitUntil(() => !elementsUtils.isActiveBySelector(selector), {
      timeout: timeout,
      timeoutMsg: `Element: ${selector} is active`,
    });
  },

  waitIsDisabled(selector: string, timeout: number = 10000) {
    browser.waitUntil(() => !$(selector).isEnabled(), {
      timeout: timeout,
      timeoutMsg: `Element: ${selector} is not Disabled`,
    });
  },

  waitPageIsReady(timeout: number = 5000): void {
    $(ROOT_SELECTOR).waitForExist({
      timeout: timeout,
      timeoutMsg: 'Server & Client sides do not work, ROOT does not exist, page is empty',
    });
    $(`${ROOT_SELECTOR} div`).waitForExist({
      timeout: timeout,
      timeoutMsg: 'Server side does not work, ROOT is empty',
    });
  },

  waitElementsTextChanged(selector: string, wantedText: string, timeout: number = 10000): void {
    browser.waitUntil(() => $(selector).getText() === wantedText, {
      timeout: timeout,
      timeoutMsg: `Text of element ${selector} is not equal to ${wantedText}`,
    });
  },

  waitElementVisible(selector: string, timeout: number = 10000) {
    browser.waitUntil(() => $(selector).getAttribute(automationTags.dataAutoVisible) === 'true', {
      timeout: timeout,
      timeoutMsg: `Element ${selector} is not visible after ${timeout} ms`,
    });
  },
};
