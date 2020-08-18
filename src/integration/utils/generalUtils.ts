import * as Chance from 'chance';
import SPECS from '../data/testSpecsData';
import { info, debug } from './logUtils';
import { params } from '../configs/config';
import { Platform } from '../enums';

const chance = new Chance();

export function removeFromArray(sourceArray: any[], itemsToRemove: Array<any> | any): any[] {
  itemsToRemove = itemsToRemove.isArray() ? itemsToRemove : [itemsToRemove];
  return sourceArray.filter((item) => !itemsToRemove.includes(item));
}
/**
 *  Function generates random number
 * @param {number} maxNumber - the range we're looking for the number
 * @param {number} minNumber - from which number to start the choose
 * @param {array} unwantedRand - blacklisted number
 */
export function generateRandomNumber(
  maxNumber: number,
  minNumber: number = 1,
  unwantedRand: Array<number> | number = [],
): number {
  let randNum = null;
  if (typeof unwantedRand === 'number') {
    unwantedRand = [unwantedRand];
  }
  do {
    randNum = chance.integer({ min: minNumber, max: maxNumber });
  } while (unwantedRand.includes(randNum));
  info(`Random number: ${randNum}, min: ${minNumber}, max: ${maxNumber}`);
  return randNum;
}

export function getRandomItemOutOfArray(list: Array<any>, startIndex: number = 0, quantity: number = 1): any {
  info(`Get random element from array`);
  const randItems = chance.pickset(list.slice(startIndex), quantity);
  info(`rand item: ${JSON.stringify(randItems)}`);
  return quantity === 1 ? randItems[0] : randItems;
}

export function getRandomBoolean(): boolean {
  return chance.bool();
}

export function getDateAsString(date?: Date, numbersOnly = true) {
  if (!date) {
    date = new Date();
  }
  if (numbersOnly) {
    return date.toISOString().substring(0, 19).replace(/T|:|-/g, '');
  } else {
    return date.toISOString().substring(0, 19);
  }
}

export function getRandomEmail(domain: string = '@automation.test'): string {
  const date = getDateAsString();
  return `user${date}${chance.letter()}${domain}`;
}

export function isMobileDeviceInUse(): boolean {
  debug(`Platform is ${params.platform}`);
  switch (params.platform) {
    case 'desktop':
      return false;
    case 'mobile':
      return true;
    case 'tablet':
      // @ts-ignore: browser.config does not have the property in types
      const abbr = browser.config.testEnvironment.abbr;
      // @ts-ignore: browser.config does not have the property in types
      const dpiRange = browser.config.testEnvironment.dpiRange;
      info(`Abbr: ${abbr} - dpiRange: ${dpiRange}`);
      return dpiRange === '1' || dpiRange === '2';
  }
}

/**
 * Get execution platform of testSuite
 * @param {string} suiteName
 */
export function getExecPlatform(suiteName: string): string {
  info(`Suite: ${suiteName}, execPlatform  ${SPECS[suiteName].execPlatform}`);
  return SPECS[suiteName].execPlatform;
}

export function isMadlan(): boolean {
  info(`Check if working with madlan or localize client`);
  return getExecPlatform(params.suite) === Platform.MADLAN;
}

export function arrayIncludesValue(array: any[], value: any): boolean {
  info(`check if value ${value} included in one of arrays item ${array}`);
  return array.some((element) => element.toLowerCase().includes(value.toLowerCase()));
}

export function valueIncludesItemFromArray(array: string[], value: string): boolean {
  info(`check if value ${value} includes one of arrays ${array} item`);
  return array.some((element) => value.toLowerCase().includes(element.toLowerCase()));
}

export function arraysEqual(array1: any[], array2: any[]): boolean {
  info(`check if array ${array1} is equal to second array ${array2}`);
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      info(`items at index ${i} ${array1[i]} and ${array2[i]} are not equal`);
      return false;
    }
  }
  return true;
}

export function itemFromArrayIncludedInSecondArray(array1: any[], array2: any[]): boolean {
  info(`check if item from array2 ${array2} is included in array1 ${array1}`);
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].toLowerCase().includes(array2[j].toLowerCase())) {
        info(`item from array1 at index ${i} ${array1[i]} includes item from array2 at index ${j} ${array2[j]}`);
        return true;
      }
    }
  }
  info('no item from array1 is included at any item from array2');
  return false;
}

export function allItemsFromArrayIncludedInSecondArray(array1: any[], array2: any[]): boolean {
  info(`check if all items from array2 ${array2} are included in array1 ${array1}`);
  const lowerCaseArray1 = array1.map((item) => item.toLowerCase());
  for (let i = 0; i < array2.length; i++) {
    if (!lowerCaseArray1.includes(array2[i].toLowerCase())) {
      info(`item from array2 ${array2[i]} is not included at array1 ${array1}`);
      return false;
    }
  }
  info('all items from array1 are included at array2');
  return true;
}

export function getDuplicateItemsInArray(arrayToCheck) {
  info(`Start to check for duplicate items in array`);
  const usedValues = [],
    duplicatedValues = [];
  for (let i = 0; i < arrayToCheck.length; i++) {
    if (usedValues.includes(arrayToCheck[i])) {
      info(`item ${arrayToCheck[i]} included in usedValues array already, therefore adding it to doubledValues array`);
      duplicatedValues.push(arrayToCheck[i]);
    } else {
      usedValues.push(arrayToCheck[i]);
    }
  }
  return duplicatedValues;
}
