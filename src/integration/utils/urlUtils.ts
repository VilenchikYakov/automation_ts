import * as config from '../configs/config';
import { TEST_ENVIRONMENT } from '../configs/generalConfig';
import { info } from './logUtils';
import { isMadlan } from './generalUtils';
import { iGetUrl, iUrlParam } from '../interfaces';

export function getGenericHostName(): string {
  if (config.params.host) {
    if (config.params.env === TEST_ENVIRONMENT.localhost) {
      throw new Error(`Please don't use HOST param, when LOCALHOST is your environment`);
    } else if (isMadlan() && config.params.env === TEST_ENVIRONMENT.production) {
      throw new Error(`Please don't use HOST param, when your environment is MADLAN PRODUCTION`);
    }
  }

  if (config.params.host.toString().includes(':')) {
    return config.params.host;
  } else {
    const prefix = 'https://';
    const hotsExtension = isMadlan()
      ? config.hostExtensions[config.params.env].il
      : config.hostExtensions[config.params.env].localize;
    return prefix + config.params.host + hotsExtension;
  }
}

/**
 * Get server host
 */
export function getServerHost(): string {
  if (config.params.host) {
    return getGenericHostName();
  } else if (isMadlan()) {
    return config.params.env === TEST_ENVIRONMENT.localhost &&
      // @ts-ignore: browser.config does not have the property in types
      browser.config.testEnvironment.osType === 'ios'
      ? config.madlanUrlIos
      : config.madlanUrl;
  } else {
    return config.params.env === TEST_ENVIRONMENT.localhost &&
      // @ts-ignore: browser.config does not have the property in types
      browser.config.testEnvironment.osType === 'ios'
      ? config.urlIos
      : config.localizeUrl;
  }
}

/**
 * Function to add general parameters to url
 * @param {string} url - url string to work with
 * @param {array of objects} params - parameters to be added to url. they should be in following structure
 * [{key: 'xxxx', value: 'yyyyy'}, {key: 'aaaaa', value: 'bbbbb'}]
 * @param {boolean} urlCommonPackage - define if to add the operator param using URL common package or String Actions
 * @returns {string} updated URL
 */

export function addUrlParams(url: string, params: Array<iUrlParam>, urlCommonPackage: boolean = true): string {
  return urlCommonPackage ? addUrlParamsUsingCommonPackage(url, params) : addUrlParamsUsingStringActions(url, params);
}

/**
 * Add parameters to url
 * @param {string} url
 * @param {Array} urlParams - parameters to be added to url
 */
function addUrlParamsUsingCommonPackage(url: string, urlParams: Array<iUrlParam>): string {
  try {
    if (!Array.isArray(urlParams) || !urlParams.length) {
      info(`there aren't any params needed to be added to the URL`);
      return url;
    }
    const includesSpace = url.includes(' ') || url.includes('%20');
    info(`provided url includes spaces: ${includesSpace}`);
    const updatedUrl = new URL(url);
    urlParams.forEach((paramObject) => updatedUrl.searchParams.append(paramObject.key, paramObject.value));
    return includesSpace ? updatedUrl.toString().replace(/[+]/g, '%20') : updatedUrl.toString();
  } catch (error) {
    throw new Error(`Failed while adding urlParam to url ${url}, Error: ${error}`);
  }
}

/**
 * Add parameters to url
 * @param {string} url
 * @param {Array} urlParams - parameters to be added to url
 */
export function addUrlParamsUsingStringActions(url: string, urlParams: Array<iUrlParam>): string {
  try {
    if (!Array.isArray(urlParams) || !urlParams.length) {
      info(`there aren't any params needed to be added to the URL`);
      return url;
    }
    urlParams.forEach(
      (paramObject) => (url = url + (url.includes('?') ? '&' : '?') + paramObject.key + '=' + paramObject.value),
    );
    return url.toString();
  } catch (error) {
    throw new Error(`Failed while adding urlParam to url ${url}, Error: ${error}`);
  }
}

/**
 * Add default parameters to url
 * @param {string} url
 * @param {boolean} addOperatorParam, add attribute for marking automation test action
 * @param {boolean} useUrlCommonPackage, use the native nodejs URL package or not
 * @param {string} wantedEnvironment, production/internal
 * @param {string} host, madlan or localize
 * @returns {string} url with additional url parameters
 */
export function addDefaultParametersToUrl(
  url: string,
  addOperatorParam: boolean = true,
  useUrlCommonPackage: boolean = true,
  wantedEnvironment?: string,
  host?: string,
): string {
  if (!wantedEnvironment) {
    wantedEnvironment = config.params.env;
  }
  try {
    if (wantedEnvironment === TEST_ENVIRONMENT.production) {
      url = addUrlParams(url, config.urlGeneralParams, useUrlCommonPackage);
      url = addUrlParams(
        url,
        host === 'madlan' || isMadlan() ? config.productionAuthParam.madlan : config.productionAuthParam.localize,
        useUrlCommonPackage,
      );
    } else if (wantedEnvironment === TEST_ENVIRONMENT.internal) {
      url = addUrlParams(url, config.urlGeneralAuthParam, useUrlCommonPackage);
    }
    if (addOperatorParam) {
      url = addUrlParams(url, config.generalOperatorParam, useUrlCommonPackage);
    }
    return url;
  } catch (error) {
    throw new Error(`Failed while adding url parameters to url: ${url}`);
  }
}

export function getUrl(getUrl: iGetUrl = { ABTest: [], addOperatorParam: true, useUrlCommonPackage: true }): string {
  let url = getServerHost();
  url = addDefaultParametersToUrl(url + (getUrl.urlSuffix || '/'), getUrl.addOperatorParam, getUrl.useUrlCommonPackage);
  url = addUrlParams(url, getUrl.ABTest);
  info(`Url: ${url}`);
  return url;
}

export function refreshOpenedPage() {
  info('refreshing opened page');
  const urlToWork = addDefaultParametersToUrl(browser.getUrl());
  info(`url: ${urlToWork}`);
  browser.url(urlToWork);
}
