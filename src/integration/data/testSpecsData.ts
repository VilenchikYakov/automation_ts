import * as path from 'path';
import { Platform } from '../enums';
import { TEST_PLATFORM, TEST_SCOPES } from '../configs/generalConfig';
import * as upath from 'upath';

const SPECS = {
  example: {
    specs: [path.resolve(__dirname, '../specs/example/example.ts')],
    scope: [TEST_SCOPES.all],
    testPlatforms: TEST_PLATFORM.all,
    execPlatform: Platform.LOCALIZE,
    headless: true,
  },
  smoke: {
    specs: [path.resolve(__dirname, '../specs/smoke/desktop/nyc/exploreAddress.spec.ts')],
    scope: [TEST_SCOPES.all],
    testPlatforms: TEST_PLATFORM.desktop,
    execPlatform: Platform.LOCALIZE,
  },
  test: {
    specs: [upath.toUnix(path.resolve(__dirname, '../specs/test/specs')) + '/*.js'],
  },
};

export default SPECS;
