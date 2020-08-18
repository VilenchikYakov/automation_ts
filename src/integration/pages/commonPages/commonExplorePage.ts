import BasePage from '../basePage';
import SearchInput from '../elements/searchInput';

export default class CommonExplorePage extends BasePage {
  readonly searchInput = new SearchInput();

  open() {
    super.open({ urlSuffix: '/explore' });
  }
}
