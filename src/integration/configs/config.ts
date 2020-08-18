//  issues while testing localhost URLs or private servers in Safari on macOS/OS X and iOS
//  https://www.browserstack.com/question/663
import * as ip from 'ip';
import * as minimist from 'minimist';
import { LocalizeCities } from '../enums';
import SPECS from '../data/testSpecsData';

const citiesUrlSuffix = {
  'New York': '/nyc',
  Chicago: '/chicago',
};

interface Param {
  key: string;
  value: string;
}

interface IABParams {
  [key: string]: Param;
}

const argv = minimist(process.argv.slice(2));
const runner = argv._.pop();
const isLocal = runner.includes('local');

if (!Object.keys(SPECS).includes(argv.SUITE)) {
  throw new Error(
    `Incorrect suite name provided: ${
      argv.SUITE
    }, please enter correct suite name.  Possible suites names: ${Object.keys(SPECS)}`,
  );
}

export const params = {
  suite: argv.SUITE,
  platform: !argv.PLATFORM ? 'desktop' : argv.PLATFORM,
  env: argv.ENV,
  id: argv.ID,
  device: argv.DEVICE,
  user: argv.USER,
  rp: argv.RP === undefined ? false : JSON.parse(argv.RP),
  logLevel: argv.LOGLEVEL === undefined ? 'info' : argv.LOGLEVEL,
  local: argv.LOCAL === undefined ? isLocal : JSON.parse(argv.LOCAL),
  host: argv.HOST,
  city: !SPECS[argv.SUITE].city ? LocalizeCities.NEWYORK : SPECS[argv.SUITE].city,
  generic: argv.GENERIC,
  getTrackJSErrors: SPECS[argv.SUITE].getTrackJSErrors === undefined ? true : SPECS[argv.SUITE].getTrackJSErrors,
};

export const paramsTest = {
  suite: argv.SUITE,
};

export const hostNames = {
  qaServer: '10.100.95.109',
  localServer: 'http://0.0.0.0:3000',
  localizeProductionServer: 'https://www.localize.city',
  localizeInternalServer: 'https://ng.doordawn.com',
  madlanProductionServer: 'https://www.madlan.co.il',
  madlanInternalServer: 'https://mm.madlan-internal.com',
};

export const hostExtensions = {
  internal: {
    il: '.madlan-internal.com',
    localize: '.doordawn.com',
  },
  production: {
    il: 'www.madlan.co.il',
    localize: '.localize.city',
  },
};

export function getLocalizeUrl(env: string): string {
  let hostName: string;
  switch (env) {
    case 'internal':
      hostName = hostNames.localizeInternalServer;
      break;
    case 'production':
      hostName = hostNames.localizeProductionServer;
      break;
    case 'localhost':
      hostName = hostNames.localServer;
      break;
  }
  return hostName + citiesUrlSuffix[params.city];
}

export function getMadlanUrl(env: string): string {
  switch (env) {
    case 'internal':
      return hostNames.madlanInternalServer;
    case 'production':
      return hostNames.madlanProductionServer;
    case 'localhost':
      return hostNames.localServer;
  }
}

export const localizeUrl = getLocalizeUrl(params.env);

export const madlanUrl = getMadlanUrl(params.env);

/**
 * Get ip address of machine which sends tests to Browserstack
 * as iOS devices are failed to resolve http://localhost:3000/
 */
export const urlIos = `http://${ip.address()}:3000`;

export const madlanUrlIos = `http://${ip.address()}:3000`;

export const abTestsQueries: IABParams = {
  onboardingADMode: { key: 'ab.onboardingMode', value: 'modeAD' },
  onboardingB1E3Mode: { key: 'ab.onboardingMode', value: 'modeB1E3' },
  onboardingEMode: { key: 'ab.onboardingMode', value: 'modeE' },
  onboardingDMode: { key: 'ab.onboardingMode', value: 'modeD' },
  feedOn: { key: 'ab.feed', value: 'true' },
  feedOff: { key: 'ab.feed', value: 'false' },
  signUpFormModeA: { key: 'ab.signupForm', value: 'modeA' },
  signUpFormModeB: { key: 'ab.signupForm', value: 'modeB' },
};

export const urlGeneralAuthParam: Param[] = [{ key: 'auth', value: 'AZV4YUYTUZY6FKZSTFFUR96G7K9S5UG9' }];

export const urlGeneralParams: Param[] = [
  { key: 'devDisableIntercom', value: '1' },
  { key: 'devDisableHotjar', value: '1' },
];

export const generalOperatorParam: Param[] = [{ key: 'operator', value: 'automation' }];

export const productionAuthParam = {
  localize: [
    {
      key: 'GreatOaksFromLittleAcornsGrow',
      value: 'a72e92c0cb563790d28fb89ba4dad8ec9c2e260a58bbd5bcba',
    },
  ],
  madlan: [
    {
      key: 'GreatOaksFromLittleAcornsGrow',
      value: '01e5270f544afe83839b021e7860000ea8c37eb1003a6351a2',
    },
  ],
};

export const applitoolsKey: string = 'ghRPwkzQ1O2lls72UCLYW7kGVRFioU2RfD6yO6tVLAI110';

export const clientRequestHeaders = {
  'x-requested-with': 'XMLHttpRequest',
  'content-type': 'application/json',
  'x-dd-auth': 'bGV0c3Rlc3Q6RG9Tb21lVGVzdHNZYWxs',
  authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleGFjdC10aW1lIjoxNTYwOTMzMzE3NDc2LCJwYXlsb2FkIjoie1widWlkXCI6XCI3NTE4MzM3Yi0wMjVkLTRjZDUtODUzZS00ODM1NDU5YjA1NDJcIixcInR0bFwiOjM2MDAwMDB9IiwiaXNzIjoibG9jYWxpemUiLCJpYXQiOjE1NjA5MzMzMTd9.t6XZOUQn_AD-0GMywRiaL_ZQMeQ0lEvXyFrgpFGA9EA',
};
