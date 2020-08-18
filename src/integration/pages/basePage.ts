import { params } from '../configs/config';
import { getUrl } from '../utils/urlUtils';
import { info, warn, error } from '../utils/logUtils';
import { getCookieValue, getCurrentABTest } from '../utils/browserUtils';
import waitUtils from '../utils/waitUtils';
import fetch from 'node-fetch';
import { SESSION_ID } from '../data/generalData';
import { TEST_ENVIRONMENT } from '../configs/generalConfig';
import { iOpenParams, iUrlParam } from '../interfaces';
import HeadBlock from './commonPages/blocks/commonBlocks/headBlock';

const URL = require('url');

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
async function checkIfSSRIsAlive(url: string, timeout: number) {
  const response = await fetch(url);
  const raceResult = await Promise.race([delay(timeout), response.text()]);
  if (raceResult === undefined) {
    throw new Error('SSR is dead -->> ' + url);
  }
}

export default class BasePage {
  readonly head = new HeadBlock();
  open(
    openParams: iOpenParams = {
      urlSuffix: '',
      ABTest: [],
      addOperatorParam: true,
      useUrlCommonPackage: true,
      noRedirection: true,
    },
  ) {
    const url = getUrl({
      urlSuffix: openParams.urlSuffix,
      ABTest: openParams.ABTest,
      addOperatorParam: openParams.addOperatorParam,
      useUrlCommonPackage: openParams.useUrlCommonPackage,
    });
    browser.call(() => checkIfSSRIsAlive(url, 7000));
    try {
      browser.url(url);
    } catch (e) {
      warn('browser.url did not load the page, reload session and trying again');
      browser.reloadSession();
      try {
        browser.url(url);
      } catch (e) {
        throw new Error(`Page is not loaded, please check url. ${e}`);
      }
    }

    try {
      waitUtils.waitPageIsReady();
    } catch (e) {
      warn('Page is not complete, refresh page');
      browser.refresh();
    }
    waitUtils.waitPageIsReady();

    if (openParams.noRedirection && !browser.getUrl().includes(url)) {
      throw new Error(error(`Got redirected to '${browser.getUrl()}' instead of '${url}'`));
    }

    info(`Current AB test data: ${JSON.stringify(getCurrentABTest())}`);

    if (params.env !== TEST_ENVIRONMENT.localhost) {
      global.session_id = getCookieValue(SESSION_ID);
    }
  }
}
