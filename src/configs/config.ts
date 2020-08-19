//  issues while testing localhost URLs or private servers in Safari on macOS/OS X and iOS
//  https://www.browserstack.com/question/663
import * as ip from 'ip';
import * as minimist from 'minimist';
import SPECS from '../data/testSpecsData';

const argv = minimist(process.argv.slice(2));
const runner = argv._.pop();

if (!Object.keys(SPECS).includes(argv.SUITE)) {
  throw new Error(
    `Incorrect suite name provided: ${
      argv.SUITE
    }, please enter correct suite name.  Possible suites names: ${Object.keys(SPECS)}`,
  );
}

export const paramsTest = {
  suite: argv.SUITE,
};

/**
 * Get ip address of machine which sends tests to Browserstack
 * as iOS devices are failed to resolve http://localhost:3000/
 */
export const urlIos = `http://${ip.address()}:3000`;

export const madlanUrlIos = `http://${ip.address()}:3000`;
