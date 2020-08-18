import CommonBulletinImagesBlock from '../../../commonPages/blocks/commonBlocks/commonBulletinImagesBlock';
import VerifiedInsight from '../../../commonPages/blocks/commonBlocks/verifiedInsight';
import { warn } from '../../../../utils/logUtils';

export default class VerifiedInsightsBlock extends CommonBulletinImagesBlock {
  verifiedInsights(): VerifiedInsight[] {
    if (this.firstVerifiedInsight.optionalWaitForExist()) {
      return $$('[data-auto="verified-insight"]').map((element) => new VerifiedInsight(element));
    } else {
      warn(`Opened page does not contains verified insights`);
      return [];
    }
  }

  get firstVerifiedInsight() {
    return new VerifiedInsight();
  }
}
