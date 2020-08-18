import { info } from '../src/integration/utils/logUtils';
import { params } from '../src/integration/configs/config';

export const DEVICES = {
  iPhone11Pro: {
    browserName: 'Safari',
    platformName: 'iOS',
    platformVersion: '13.4',
    deviceName: 'iPhone 11 Pro',
    automationName: 'XCUITest',
  },
  iPhone7: {
    browserName: 'Safari',
    platformName: 'iOS',
    platformVersion: '13.4',
    deviceName: 'iPhone 7',
    automationName: 'XCUITest',
  },
  Android: {
    browserName: 'Chrome',
    platformName: 'Android',
    platformVersion: '10.0',
    deviceName: 'Android',
    automationName: 'Appium',
  },
  // WXGA720 - is skin with 720x1280 and 320 dpi
  android_WXGA720: {
    browserName: 'chrome',
    version: 'mobile-75.0',
    platform: 'ANDROID',
    'goog:chromeOptions': {
      args: ['--disable-features=TranslateUI'],
    },
    'selenoid:options': {
      name: params.suite,
      enableVNC: true,
      enableLogs: true,
      enableVideo: true,
      sessionTimeout: '30m',
      skin: 'WXGA720',
      screenResolution: '990x1760',
      androidNaturalOrientation: false,
    },
  },
  safari: {
    browserName: 'safari',
  },
  aws_mobile: {},
  chrome: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--window-size=1920,1080'],
    },
    'selenoid:options': {
      name: params.suite,
      enableVNC: true,
      enableLogs: false,
      enableVideo: true,
      sessionTimeout: '30m',
    },
  },
  chromeMobile: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      mobileEmulation: { deviceName: 'Nexus 5' },
    },
    'selenoid:options': {
      name: params.suite,
      enableVNC: true,
      enableLogs: false,
      enableVideo: true,
      sessionTimeout: '30m',
    },
  },
};

export function setDeviceCapabilities() {
  if (DEVICES[params.device]) {
    info(`Capabilities: ${JSON.stringify(DEVICES[params.device])}`);
    return DEVICES[params.device];
  }
  throw new Error(`Incorrect device name: ${params.device}`);
}
