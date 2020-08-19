import SPECS from '../data/testSpecsData';

export function getSuiteSpecs(suite: string): Array<string> {
  console.log(`SUITE: ${suite}, PATH: ${SPECS[suite].specs}`);
  return SPECS[suite].specs;
}
