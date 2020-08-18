// import addressPage from '../../pages/madlanPages/desktopAddressPage';
import addressPage from '../../pages/nycPages/desktopAddressPage';
import { info, debug, error, warn } from '../../utils/logUtils';

describe('simple test', () => {
  beforeAll(() => {
    info(`starting simple test`);
    debug(`bla bla simple test`);
  });
  it(`Simple test verification`, () => {
    addressPage.open();
    info(`info simple test`);
    debug(`debug simple test`);
    error(`error simple test`);
    warn(`warn simple test`);

    browser.pause(1000);
  });
});
