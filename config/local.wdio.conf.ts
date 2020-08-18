import { info, error, warn } from '../src/integration/utils/logUtils';
import { params } from '../src/integration/configs/config';
import { TEST_PLATFORM, SUITE_CONFIG_KEYS } from '../src/integration/configs/generalConfig';
import { DEVICES } from './devices_local';
import * as validateUtils from '../src/integration/utils/validateConfigUtils';
import * as fs from 'fs';
import * as path from 'path';

info('params: ' + JSON.stringify(params));
const MOBILE_DEVICE = params.device ? params.device : 'iphone10';
const DEVICE = params.platform === TEST_PLATFORM.mobile ? MOBILE_DEVICE : 'desktop';
const SPEC_PATH = validateUtils.getSuiteSpecs(params.suite);
validateUtils.checkSuiteFitPlatform(Object.keys(DEVICES));
validateUtils.checkScopeEnvironment();

function setJasmineTimeout(): number {
  const jasmineTimeout = validateUtils.getValueOfTestSuiteKey(SUITE_CONFIG_KEYS.jasmineTimeout);
  return jasmineTimeout ? jasmineTimeout : 900000;
}

console.log(`pro`)

if (process.env.OS.includes('Windows')){
  if (!fs.existsSync(process.env.INIT_CWD + '/screenshots')) {
    fs.mkdirSync(process.env.INIT_CWD + '/screenshots');
  }
} else {
  if (!fs.existsSync(process.env.PWD + '/screenshots')) {
    fs.mkdirSync(process.env.PWD + '/screenshots');
  }
}

const chromeArgsHeadless = [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--window-size=1920,1080',
];

function setChromeOptions() {
  const chromeArgs = { args: ['disable-notifications'] };
  if (validateUtils.getValueOfTestSuiteKey(SUITE_CONFIG_KEYS.headless)) {
    info(`Working with headless chrome`);
    Array.prototype.push.apply(chromeArgs.args, chromeArgsHeadless);
    info(`Chrome arguments after adding headless: ${JSON.stringify(chromeArgs)}`);
  }
  if (validateUtils.getValueOfTestSuiteKey(SUITE_CONFIG_KEYS.devtools)) {
    info(`Adding Dev Tools debug port`);
    Array.prototype.push.apply(chromeArgs.args, ['--remote-debugging-port=64536']);
  }
  return chromeArgs;
}

const reporters = ['spec'];
const reporterSyncInterval = params.rp ? 120 : 10;

const config = {
  services: ['selenium-standalone'],
  maxInstances: 1,
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5859'],
  framework: 'jasmine',
  testEnvironment: {
    platformName: 'webdriver',
    testSuite: params.suite,
    platform: validateUtils.getTestPlatform(),
    osType: validateUtils.getTestPlatform(),
    testEnv: validateUtils.getTestEnv(params.env),
    deviceName: DEVICE,
    dpiRange: DEVICES[DEVICE].dpiRange,
  },
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': setChromeOptions(),
    },
  ],
  reporters: reporters,
  reporterSyncInterval: reporterSyncInterval * 1000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: setJasmineTimeout(),
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      if (assertion.message) {
        error(`${assertion.message}`);
      }
      const fileName = 'ExpectError.png';
      const outputFile = path.join('screenshots', fileName);
      browser.saveScreenshot(outputFile);
    },
  },
  logLevel: 'silent',
  connectionRetryTimeout: 50000,
  connectionRetryCount: 1,
  waitforTimeout: 10000,
  bail: 0,
  sync: true,
  coloredLogs: true,
  deprecationWarnings: false,
  specs: SPEC_PATH,
  beforeTest: (test) => {
    info(`Set size: ${DEVICES[DEVICE].w}, ${DEVICES[DEVICE].h}`);
    browser.setWindowSize(DEVICES[DEVICE].w, DEVICES[DEVICE].h);
  },
};

export { config };
