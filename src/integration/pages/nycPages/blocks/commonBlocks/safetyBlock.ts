import CommonSafetyBlock from '../../../commonPages/blocks/unitBlocks/commonSafetyBlock';
import BaseElement from '../../../baseElement';

export default class SafetyBlock extends CommonSafetyBlock {
  get safetySections() {
    return $$('[data-auto="safety-section"]');
  }

  get safetyInsights() {
    return new BaseElement('bulletin-images');
  }
}
