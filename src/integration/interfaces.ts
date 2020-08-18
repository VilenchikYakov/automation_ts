import { SpecialDB, SqlSystem, EventType } from './enums';

export interface iAPI {
  contactV2: {
    message: string;
    phone: string;
    email: string;
  };
  feedback: {
    message: string;
    email: string;
  };
  loginV3: {
    email: string;
  };
  updateUserProfile: {
    commutePreference: {
      text: string;
    };
  };
}

export interface iButton {
  buttonText: string;
  buttonSelector: string;
}

export interface iApplitoolsAction {
  selector: string;
  action: string;
  index?: number;
  value?: string;
  popup?: boolean;
}

export interface iDbEnvironment {
  platformMadlan?: boolean;
  environment?: string;
  special?: SpecialDB;
  client?: SqlSystem;
}

export interface iDbConnectDetails {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export interface iDbQuery {
  tableName: string;
  whereParams: any;
  limit?: number;
}

export interface iDbSpecificQuery extends iDbQuery {
  select?: string[];
  orderBy: any;
  offset?: number;
}

export interface iGetUrl {
  urlSuffix?: string;
  ABTest?: Array<iUrlParam>;
  addOperatorParam?: boolean;
  useUrlCommonPackage?: boolean;
}

export interface iOpenParams extends iGetUrl {
  noRedirection?: boolean;
}

export interface iRunClientHttpRequest {
  host?: string;
  urlSuffix?: string;
  fullUrl?: string;
}

export interface iRunClientHttpPostRequest extends iRunClientHttpRequest {
  requestBody: any;
}

export interface iRequiredSuggestion {
  value: string | number;
  type?: string;
  overlay?: boolean;
  clearBefore?: boolean;
  maxChecks?: number;
}

export interface iSearchedItems {
  beds: number;
  baths_d: number;
  price: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface iEventObject {
  url: string | object;
  options?: {
    body;
  };
  data?: any;
}

export interface iSubmittedInfo {
  submittedName?: string;
  submittedPhone?: string;
  submittedEmail?: string;
  submittedMessage?: string;
}

export interface iEventSearchDetails {
  eventType: EventType;
  eventName: string;
}

export interface iTrackJS {
  query?: string;
  startDate?: string;
  endDate?: string;
  includeStack?: boolean;
  size?: number;
}

export interface iFilterConfig {
  name: string;
  filterName: string;
  possibleSelections?: any[];
  eventKey: string;
  searchType?: string;
  sellMinValue?: number;
  sellMaxValue?: number;
  rentMinValue?: number;
  rentMaxValue?: number;
}

export interface iPriceFilterChanges {
  rent: number;
  sell: number;
}

export interface iFiltersSortTestResult {
  testResult: boolean;
  message: string;
}

export interface iMadlanTestStreet {
  city: string;
  streetName: string;
  streetId: string;
  streetDocId: string;
  suggestionSearchText: string;
  searchPossibilities: Array<string>;
  streetAltNames: Array<any>;
}

export interface iMadlanTestNghb {
  city: string;
  nghbName: string;
  nghbId: string;
  nghbDocId: string;
  suggestionSearchText: string;
  searchPossibilities: Array<string>;
}

export interface iUrlParam {
  key: string;
  value: string;
}

export interface iTestFilter {
  searchType: string;
  testFilter: string;
  filterName: string;
  eventKey: string;
  borough?: string;
  nghb?: string;
  city?: string;
  nghbName?: string;
  sellMaxValue?: number;
  rentMaxValue?: number;
  priceRangeSelection?: string;
  monthlyTaxRangeSelection?: string;
  values?: any[];
  buttonsToClick?: any[];
}

export interface iSuggestionObject {
  suggestionType: string | { isSkip: boolean };
  suggestionText: string;
  selectedNeighbourhood: string;
}

export interface iSuggestionsObject {
  suggestionTypes: string[];
  suggestionTexts: string[];
}

export interface iSortTestData {
  searchedNghbData: any[];
  nearbyNghbData: any[];
}

export interface iSortOrderFailure {
  index1: number;
  index2: number;
  item1: any;
  item2: any;
  sortOrder: string;
}

export interface iBulletinsPatternFailure {
  index: number;
  requiredType: string;
  actualType: string;
}

export interface iSortConfig {
  eventKey: string;
  bulletinKey: string;
  sortDirection: string;
}

export interface iTestSortData {
  sortConfig: iSortConfig;
  nghb: string;
  city?: string;
  borough?: string;
}

export interface iTestResult {
  result: boolean;
  message: string | string[];
}

export interface iLocalizeNghbSelect {
  city?: string;
  borough?: string;
}

export interface iContactSellerSubmitDetails extends iSubmittedInfo {
  setMessage: boolean;
}

export interface iSelectBulletin {
  bulletinType?: string;
  manuallyCratedBulletin?: boolean;
  searchedNghbBulletins?: boolean;
}

export interface iMadlanCity {
  cityHbr: string;
  cityEng: string;
}

export interface iFileToRead {
  filePath: string;
  fileName: string;
}

export interface seoTestData {
  value1?: string;
  value2?: string;
  array1?: string[];
  array2?: string[];
  seoElement: string;
}

export interface iEventData {
  hierarchyLevels: string[];
  nearByNghbs: string[];
}
