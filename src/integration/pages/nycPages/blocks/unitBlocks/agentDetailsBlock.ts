import BaseElement from '../../../baseElement';

export default class AgentDetailsBlock extends BaseElement {
  constructor() {
    super('agent-details-block');
  }

  get agentListingId() {
    return new BaseElement('agent-listingid');
  }

  get agentSource() {
    return new BaseElement('agent-source');
  }

  get availableListingsLink() {
    return new BaseElement('agent-listing-link');
  }
}
