import { automationTags } from '../data/webElementData';

export default {
  /**
   * Find button and get value from data-auto-active
   * @param {string} selector
   * @returns {boolean} is clicked button or no
   */
  isActiveBySelector(selector: string): boolean {
    const button = $(selector);
    button.waitForDisplayed({ timeout: 5000 });
    return JSON.parse(button.getAttribute(automationTags.dataAutoActive));
  },

  getState(selector: string) {
    const element = $(selector);
    element.waitForDisplayed({ timeout: 5000 });
    return JSON.parse(element.getAttribute(automationTags.dataAutoState));
  },
};
