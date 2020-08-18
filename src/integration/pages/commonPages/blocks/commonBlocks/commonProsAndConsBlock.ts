import BaseElement from '../../../baseElement';
import ImageBlock from './imageBlock';

export default class CommonProsAndConsBlock extends BaseElement {
  constructor() {
    super('Overview/pros_and_cons-block');
  }

  imagesUrls(): string[] {
    return this.imagesList.map((item) => item.imageUrl());
  }
  get imagesList(): ImageBlock[] {
    if (this.firstImage.optionalWaitForExist()) {
      return $$('[data-auto="bulletin-image"]').map((element) => new ImageBlock(element));
    } else {
      throw new Error('Opened bulletin does not contains images, unable to continue with test');
    }
  }
  get firstImage() {
    return new ImageBlock();
  }
}
