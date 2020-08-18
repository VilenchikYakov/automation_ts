import BaseElement from '../../../baseElement';
import CommonFooterBlock from '../../../commonPages/blocks/commonBlocks/commonFooterBlock';

export default class FooterBlock extends CommonFooterBlock {
  footerLinksApartmentTypeValues() {
    return this.footerLinksApartmentType.$$('a').map((a) => a.getAttribute('href'));
  }

  footerLinksNeighbourhoodsValues() {
    return this.footerLinksNeighbourhoods.$$('a').map((a) => a.getAttribute('href'));
  }

  footerLinksCloseNeighbourhoodsValues() {
    return this.footerLinksNeighbourhoods.$$('a').map((a) => a.getAttribute('href'));
  }

  get footerLinksApartmentType() {
    return new BaseElement('footer-links-apartmentType');
  }

  get footerLinksNeighbourhoods() {
    return new BaseElement('footer-links-neighbourhoods');
  }

  get footerLinksCloseNeighbourhoods() {
    return new BaseElement('footer-links-closeNeighbourhoods');
  }
}
