import { params } from '../configs/config';
import { SUITE_CONFIG_KEYS, TEST_ENVIRONMENT, TEST_PLATFORM, TEST_SCOPES } from '../configs/generalConfig';
import { info } from './logUtils';
import SPECS from '../data/testSpecsData';

export function getValueOfTestSuiteKey(key: string) {
  const optionalProperties = ['jasmineTimeout', 'headless', 'devtools'];
  const suite = SPECS[params.suite];
  if (suite) {
    if (key in suite) {
      info(`Get key: ${key}, value: ${suite[key]} in suite: ${params.suite}`);
      return suite[key];
    } else if (optionalProperties.includes(key)) {
      return undefined;
    } else {
      throw new Error(`The key: '${key}' does not exist in suite: ${params.suite}`);
    }
  }
  throw new Error(`The suite name: '${params.suite}' does not exist in test suites`);
}

export function getTestEnv(testEnv: string): string {
  if (TEST_ENVIRONMENT[testEnv]) {
    return TEST_ENVIRONMENT[testEnv];
  }
  throw new Error(`Wrong test environment: '${testEnv}'. Possible env: ${Object.values(TEST_ENVIRONMENT)}`);
}

export function getTestPlatform(): string {
  if (TEST_PLATFORM[params.platform]) {
    return TEST_PLATFORM[params.platform];
  }
  throw new Error(`Wrong test platform: '${params.platform}'. Possible platform: ${Object.keys(TEST_PLATFORM)}`);
}

export function getSuiteSpecs(suite: string): Array<string> {
  info(`SUITE: ${suite}, PATH: ${SPECS[suite].specs}`);
  return SPECS[suite].specs;
}

export function checkSuiteFitPlatform(devicesList: string[]): boolean {
  if (params.platform === TEST_PLATFORM.mobile) {
    checkDevice(devicesList);
  }
  const suite = SPECS[params.suite];
  if (suite) {
    if (
      suite[SUITE_CONFIG_KEYS.testPlatforms] === TEST_PLATFORM[params.platform] ||
      suite[SUITE_CONFIG_KEYS.testPlatforms] === TEST_PLATFORM.all
    ) {
      return true;
    } else {
      throw new Error(`Requested suite: ${params.suite} can't run on test platform ${params.platform}`);
    }
  }
}

export function checkDevice(devicesList: string[]): void {
  if (!devicesList.includes(params.device)) {
    throw new Error(`Requested device ${params.device} is not part of possible devices for test ${devicesList}`);
  }
}

export function checkScopeEnvironment(): void {
  const scopeList = SPECS[params.suite].scope;
  if (!scopeList.length) {
    throw new Error('Empty scope list in test data');
  }
  if (!(scopeList.includes(params.env) || scopeList.includes(TEST_SCOPES.all))) {
    throw new Error(`Incorrect environment: ${params.env}, for this suite is available ${JSON.stringify(scopeList)}`);
  }
}
