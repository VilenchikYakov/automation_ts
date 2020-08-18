import BaseElement from '../../../baseElement';
import SearchInput from '../../../elements/searchInput';
import SaveSearchToggle from '../../../elements/saveSearchToggle';

export default class CommonDesktopListHeader extends BaseElement {
  readonly searchInput = new SearchInput();
  readonly saveSearchToggle = new SaveSearchToggle();
}
