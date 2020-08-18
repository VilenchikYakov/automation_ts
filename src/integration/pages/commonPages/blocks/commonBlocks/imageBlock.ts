import BaseElement from '../../../baseElement';
import { automationTags } from '../../../../data/webElementData';
export default class ImagesBlock extends BaseElement {
  constructor(imageElement?: string | WebdriverIO.Element) {
    super(imageElement ? imageElement : 'bulletin-image');
  }
  imageUrl(): string {
    return this.getAttribute(automationTags.dataAutoImageUrl);
  }
}
