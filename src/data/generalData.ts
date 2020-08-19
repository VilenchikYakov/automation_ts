import { getDateAsString } from '../utils/generalUtils';

export const COOKIE_TRACKING_ID_NAME = 'APP_CTX_USER_ID';

export const entryAddressString = {
  'New York': {
    production: {
      check: '/address/180-west-street-brooklyn-new-york-ny',
      rent: '/for-rent/bay-ridge-neighborhood-brooklyn-new-york-ny',
      buy: '/for-sale/bay-ridge-neighborhood-brooklyn-new-york-ny',
    },
    internal: {
      check: '/address/180-west-street-brooklyn-new-york-ny',
      rent: '/for-rent/bay-ridge-neighborhood-brooklyn-new-york-ny',
      buy: '/for-sale/bay-ridge-neighborhood-brooklyn-new-york-ny',
    },
    localhost: {
      check: '/address/180-west-street-brooklyn-new-york-ny',
      rent: '/for-rent/bay-ridge-neighborhood-brooklyn-new-york-ny',
      buy: '/for-sale/bay-ridge-neighborhood-brooklyn-new-york-ny',
    },
  },
};

export const RANDOM_MESSAGE = `This is an Automation test: ${getDateAsString()}`;
export const SESSION_ID = 'APP_CTX_SESSION_ID';

export const numberRegex = /\d+/g;

export const heightRegex = /height=\d*/;

export const httpRegex = /HTTP\/\d(\.\d)? (\d)*/gi;

export const xcacheRegex = /X-Cache: (.*)/gi;
