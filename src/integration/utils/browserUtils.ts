import { addDefaultParametersToUrl } from './urlUtils';
import { info } from './logUtils';
import { isMadlan } from './generalUtils';
import { madlanUrl, params, hostNames } from '../configs/config';

export function getCookieValue(name: string): string {
  const cookiesList = browser.getCookies([name]);
  if (cookiesList.length) {
    return cookiesList.pop().value;
  } else {
    throw new Error(`No cookies by name: ${name}`);
  }
}

export function clearSiteData(wantedUrl?: string) {
  wantedUrl = `${
    wantedUrl
      ? wantedUrl
      : isMadlan()
      ? madlanUrl
      : params.env === 'internal'
      ? hostNames.localizeInternalServer
      : hostNames.localizeProductionServer
  }/robots.txt`;
  wantedUrl = addDefaultParametersToUrl(wantedUrl);
  browser.url(wantedUrl);
  browser.deleteAllCookies();
  browser.execute(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });
  info('Delete cookies, local storage, session storage');
}

export function getCurrentABTest() {
  return browser.execute(() => {
    return (window as any).__LOCALIZE_SSR_CONFIG__.abTests.context;
  });
}
