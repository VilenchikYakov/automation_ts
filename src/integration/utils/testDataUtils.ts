import * as generalUtils from './generalUtils';
import { info, warn } from './logUtils';
import * as nycAddressData from '../data/addressData/nycAddressData';
import { NY_Streets } from '../data/addressData/nycStreetNames';
import {  iLocalizeNghbSelect } from '../interfaces';
import { LocalizeCities } from '../enums';
import { params } from '../configs/config';
import { streetAllowListNotToReplace } from '../data/addressData/nycAddressData';
import { numberRegex } from '../data/generalData';

const addrNumberSynonyms = ['rd', 'th', 'nd', 'st'];

export function getRandomBoroughLocalize(city?: string): string {
  let boroughs: string[];
  switch (city) {
    case LocalizeCities.NEWYORK:
    case undefined:
      boroughs = nycAddressData.NY_BOROUGHS;
      break;
    default:
      throw new Error(`Incorrect localize city ${city} selected for test`);
  }
  info(`localize city for test: ${city}`);
  info(`Selecting random localize borough name from boroughs list`);
  return generalUtils.getRandomItemOutOfArray(boroughs);
}

export function getRandomNeighbourhoodLocalize(data: iLocalizeNghbSelect = { city: LocalizeCities.NEWYORK }): string {
  let nghbs: { [key: string]: Array<string> };
  // if data was not provided error was throwen and no data was selected or generated
  const selectedBorough = !data.borough ? getRandomBoroughLocalize(data.city) : data.borough;
  info(`Selecting random localize nghb name from nghbs list using borough: ${selectedBorough}`);
  switch (data.city) {
    case LocalizeCities.NEWYORK:
    case undefined:
      nghbs = nycAddressData.NY_NEIGHBORHOODS;
      break;
      break;
    default:
      throw new Error(`Incorrect localize city ${data.city} selected for test`);
  }
  return generalUtils.getRandomItemOutOfArray(nghbs[selectedBorough], 0);
}

export function getRandomStreetLocalize(city?: string): string {
  let streets: string[];
  info(`Selecting random localize street name from streets list`);
  switch (city) {
    case LocalizeCities.NEWYORK:
    case undefined:
      streets = NY_Streets;
      break;
    default:
      throw new Error(`Incorrect localize city ${city} selected for test`);
  }
  return generalUtils.getRandomItemOutOfArray(streets);
}

// value is searched string (nghb, borough, street, address)
export function replaceLocalizeSearchedStreetRepresentation(value: string): string[] {
  const valueRepresentationPossibilities: string[] = [];
  info(`Check if searched street name required representation replace using searched value: ${value}`);
  if (params.city === LocalizeCities.NEWYORK) {
    const testedValueRepresentationPossibilities = generateAddressRepresentationPossibilities(value);
    info(`testedValueRepresentationPossibilities: ${testedValueRepresentationPossibilities}`);
    for (let i = 0; i < testedValueRepresentationPossibilities.length; i++) {
      if (
        !generalUtils.arrayIncludesValue(
          streetAllowListNotToReplace,
          testedValueRepresentationPossibilities[i].split(', ')[0],
        )
      ) {
        // split is required for the case of address or when entering "xxxx, xxxx, xxxx" otherwice arrayIncludesValue won't work
        if (testedValueRepresentationPossibilities[i].toLowerCase().split(', ')[2] === 'new york') {
          info(`As full address provided and it contains New York, need to replace it to NY`);
          testedValueRepresentationPossibilities[i] = testedValueRepresentationPossibilities[i].replace(
            /new york/i,
            'NY',
          );
        }
        info(`new value: ${testedValueRepresentationPossibilities[i]}`);
        if (testedValueRepresentationPossibilities[i].toLowerCase().includes('street')) {
          valueRepresentationPossibilities.push(
            testedValueRepresentationPossibilities[i].replace(/street/i, 'St').toLowerCase(),
          );
        } else if (testedValueRepresentationPossibilities[i].toLowerCase().includes('avenue')) {
          valueRepresentationPossibilities.push(
            testedValueRepresentationPossibilities[i].replace(/avenue/i, 'Ave').toLowerCase(),
          );
        } else {
          warn('Searched does not includes Street or Avenue string, no need to replace representation');
          valueRepresentationPossibilities.push(testedValueRepresentationPossibilities[i].toLowerCase());
        }
      } else {
        info(
          `Suggestion texts first part included in allowed list of nghb names and street representation is not required`,
        );
        valueRepresentationPossibilities.push(value.toLowerCase());
      }
    }
    info(`valueRepresentationPossibilities: ${valueRepresentationPossibilities}`);
    return valueRepresentationPossibilities;
  } else {
    warn(`No street name representation is required for city ${params.city}`);
    valueRepresentationPossibilities.push(value.toLowerCase());
    return valueRepresentationPossibilities;
  }
}

export function localizeAddressData(addressString: string | number, wantedData: string = 'city') {
  info(`selecting data of type: ${wantedData} from specific suggestion for localize client`);
  const addressStringParts: string[] = addressString.toString().split(',');
  info(`addressStringParts: ${addressStringParts}`);
  switch (wantedData) {
    case 'city':
      info(`suggestion city: ${addressStringParts[addressStringParts.length - 1].trim()}`);
      return addressStringParts[addressStringParts.length - 1].trim();
    case 'borough':
      if (addressStringParts.length === 3) {
        info(`suggestion borough: ${addressStringParts[1].trim()}`);
        return addressStringParts[1].trim();
      } else {
        info(`suggestion borough: ${addressStringParts[0].trim()}`);
        return addressStringParts[0].trim();
      }
    case 'street':
    case 'address':
    case 'nghb':
      info(`suggestion other: ${addressStringParts[0].trim()}`);
      return addressStringParts[0].trim();
    default:
      throw new Error(`provided incorrect suggestion part`);
  }
}

export function generateAddressRepresentationPossibilities(testedValue: string | number): string[] {
  const valueRepresentationPossibilities: string[] = [];
  const addrPart = localizeAddressData(testedValue, 'address');
  info(`addrPart: ${addrPart}`);
  const addrNumbers = addrPart.match(numberRegex);
  info(`addrNumbers: ${addrNumbers}`);
  if (addrNumbers === null || addrNumbers.length === 1) {
    valueRepresentationPossibilities.push(testedValue.toString());
  } else if (addrNumbers.length > 1) {
    const valueToReplace = addrNumbers.pop().toString();
    info(`valueToReplace: ${valueToReplace}`);
    // this change is required to deal with issue "795 5 Avenue, Manhattan, New York" where 5 should be replaced but actually first 5 is replaced
    addrNumberSynonyms.map((item) =>
      valueRepresentationPossibilities.push(
        testedValue.toString().replace(' ' + valueToReplace, ' ' + valueToReplace + item),
      ),
    );
  }
  info(`valueRepresentationPossibilities: ${valueRepresentationPossibilities}`);
  return valueRepresentationPossibilities;
}

export function numbersCompareArray(num: number): string[] {
  const compareArray = [];
  const numStr = num.toString();
  if (numStr.length === 1) {
    compareArray.push(numStr);
  } else if (numStr.length === 2) {
    compareArray.push(numStr);
    // number ab -> insert a-b
    compareArray.push(numStr.substring(0, numStr.length - 1) + '-' + numStr.substring(numStr.length - 1));
  } else if (numStr.length === 3) {
    compareArray.push(numStr);
    // number abc => insert a-bc
    compareArray.push(numStr.substring(0, numStr.length - 2) + '-' + numStr.substring(numStr.length - 2));
    // number abc => inser a-b
    compareArray.push(
      numStr.substring(0, numStr.length - 2) + '-' + numStr.substring(numStr.length - 2, numStr.length - 1),
    );
    // number abc => insert ab-c
    compareArray.push(
      numStr.substring(0, numStr.length - 1) + '-' + numStr.substring(numStr.length - 1, numStr.length),
    );
    // number abc => inser ab
    compareArray.push(numStr.substring(0, numStr.length - 1));
  }
  return compareArray;
}

export function verifyProjectWithinSuggestions(
  suggectionsTexts: string[],
  projectName: string,
  projectAddress: string,
): boolean {
  info(`Check if project name ${projectName} or project address ${projectAddress} included in suggestion text`);
  if (generalUtils.arrayIncludesValue(suggectionsTexts, projectName)) {
    info(`Project name included within suggestion textx`);
    return true;
  } else if (generalUtils.arrayIncludesValue(suggectionsTexts, projectAddress)) {
    info(`Project address included within suggestion textx`);
    return true;
  }
  return false;
}
