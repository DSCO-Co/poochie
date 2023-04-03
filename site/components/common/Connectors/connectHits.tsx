import { createConnector } from 'react-instantsearch-dom';

const connectHits = createConnector({
  displayName: 'Hits',
  getProvidedProps(props, searchState, searchResults) {
    const { hits = [] } = searchResults.results ? searchResults.results : {};
    return { hits };
  },
});


export default connectHits;
