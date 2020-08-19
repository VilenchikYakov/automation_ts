import * as fs from 'fs';
import * as path from 'path';
import * as validateUtils from '../src/utils/validateConfigUtils';
import { paramsTest } from '../src/configs/config';

const specs = validateUtils.getSuiteSpecs(paramsTest.suite);
console.log(`specs: ${specs}`);

if (process.env.OS.includes('Windows')) {
  if (!fs.existsSync(process.env.INIT_CWD + '/screenshots')) {
    fs.mkdirSync(process.env.INIT_CWD + '/screenshots');
  }
} else {
  if (!fs.existsSync(process.env.PWD + '/screenshots')) {
    fs.mkdirSync(process.env.PWD + '/screenshots');
  }
}

function setChromeOptions() {
  const chromeArgs = { args: ['disable-notifications'] };
  return chromeArgs;
}

const reporters = ['spec'];

const config = {
  services: ['chromedriver'],
  maxInstances: 1,
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5859'],
  framework: 'jasmine',
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': setChromeOptions(),
    },
  ],
  reporters: reporters,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 900000,
    expectationResultHandler: function (passed, assertion) {
      if (passed) {
        return;
      }
      if (assertion.message) {
        console.error(`${assertion.message}`);
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
  specs: specs,
};

export { config };
