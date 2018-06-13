import axios from 'axios';
import { AMMO_TEST_API_BASE_URL } from '../../config'

function fetchProducts(opts = {}) {
const { searchTerm, pageSize, page } = opts;
  const queryParams = [];
  if (searchTerm) {
    queryParams.push(`q=${searchTerm}`);
  }
  if (pageSize) {
    queryParams.push(`page_size=${pageSize}`);
  }
  if (page) {
    queryParams.push(`page=${page}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  return axios.get(`${AMMO_TEST_API_BASE_URL}/v1/products${queryString}`);
}

export default { fetchProducts };
