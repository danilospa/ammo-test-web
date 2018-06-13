import subject from './index';
import axios from 'axios';
import { AMMO_TEST_API_BASE_URL } from '../../config'

jest.mock('axios');

describe('ammoTestApi client', () => {
  describe('fetchProducts', () => {
    it('performs correct request when passing no parameters', () => {
      subject.fetchProducts();
      expect(axios.get).toBeCalledWith(`${AMMO_TEST_API_BASE_URL}/v1/products`);
    });

    it('performs correct request when passing parameters', () => {
      subject.fetchProducts({
        searchTerm: 'term',
        pageSize: 'size',
        page: 'page',
      });
      expect(axios.get).toBeCalledWith(`${AMMO_TEST_API_BASE_URL}/v1/products?q=term&pageSize=size&page=page`);
    });

    it('returns correct value', () => {
      axios.get.mockReturnValue('fetch products response');
      expect(subject.fetchProducts()).toEqual('fetch products response');
    });
  });
});
