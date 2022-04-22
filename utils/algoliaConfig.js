import algoliasearch from 'algoliasearch';

const APPLICATION_ID = '3LWXZ9I2F6';
const SEARCH_API_KEY = '4910ea584d337735b619e25d8350f19d';
const ALGOLIA_INDEX = 'projects_count_links';

export const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
export const index = client.initIndex(ALGOLIA_INDEX);
