import BaseElement from '../../../baseElement';

export default class ExploreTheAreaBlock extends BaseElement {
  constructor() {
    super('ExploreTheArea-block');
  }

  get areaHighlight() {
    return new BaseElement('area-highlight');
  }
}
