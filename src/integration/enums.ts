export enum SpecialDB {
  DG = 'datasetGenerator',
}

export enum SqlSystem {
  PG = 'postgres',
  MYSQL = 'mysql',
}

export enum SellerType {
  PRIVATE = 'private',
  AGENT = 'agent',
  ALL = '%',
}

export enum PromotionStatus {
  PROMOTED = 'promoted',
  NOT_PROMOTED = 'notPromoted',
  ALL = '%',
}

export enum EventType {
  FETCH = 'fetch',
  API = 'api',
  GA = 'ga',
}

export enum MatchLevel {
  EXACT = 'Exact',
  STRICT = 'Strict',
  CONTENT = 'Content',
  LAYOUT = 'Layout',
}

export enum Platform {
  LOCALIZE = 'localize',
  MADLAN = 'madlan',
}

export enum LocalizeCities {
  NEWYORK = 'New York',
  CHICAGO = 'Chicago',
}
