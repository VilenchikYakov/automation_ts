import desktopExplorePage from '../../../../pages/commonPages/desktopExplorePage';
import desktopAddressPage from '../../../../pages/nycPages/desktopAddressPage';

const searchInput = desktopExplorePage.searchInput;
const details = desktopAddressPage.overviewHeaderBlock;

describe('Explore Page and Address Page', () => {
  it('verify suggester can be opened and closed', () => {
    desktopExplorePage.open();
    searchInput.setInputValue('5g');
    searchInput.suggestions.getSuggestions();
    expect(searchInput.suggestions.suggester.isDisplayed()).toBeTruthy();
  });
  it('verify search works and address details and impact carousel are displayed', () => {
    searchInput.setValueAndChooseSuggestion({
      value: '180 west street, Brooklyn',
      maxChecks: 20,
    });
    desktopAddressPage.ugc.waitClosePopUp();
    expect(details.primaryAddress.optionalWaitForDisplayed(3000)).toBeTruthy(
      details.primaryAddress.selector + ' not found',
    );
    expect(details.builtIn.optionalWaitForDisplayed(3000)).toBeTruthy(details.builtIn.selector + ' not found');
    expect(details.floorCount.optionalWaitForDisplayed(3000)).toBeTruthy(details.floorCount.selector + ' not found');
    expect(desktopAddressPage.prosAndConsBlock.insightCards.length).toBeGreaterThan(1);
  });
  it('verify correct text in details', () => {
    expect(details.primaryAddress.getText()).toContain('180 West Street');
    expect(details.totalUnits.getText()).toContain('3 Units');
    expect(details.builtIn.getText()).toContain('Built in 1931');
    expect(details.floorCount.getText()).toContain('4 Stories');
  });
});
