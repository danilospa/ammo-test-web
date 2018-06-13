import subject from './index';
import ammoTestApi from '../../clients/ammoTestApi';

jest.mock('../../clients/ammoTestApi');

describe('products model', () => {
  describe('initial state', () => {
    it('sets items as empty array', () => {
      expect(subject.state.items).toEqual([]);
    });

    it('sets pages as 1', () => {
      expect(subject.state.pages).toEqual(1);
    });

    it('sets current page as 1', () => {
      expect(subject.state.currentPage).toEqual(1);
    });

    it('sets page size as 10', () => {
      expect(subject.state.currentPage).toEqual(1);
    });

    it('sets total as 0', () => {
      expect(subject.state.total).toEqual(0);
    });

    it('sets search term as empty', () => {
      expect(subject.state.searchTerm).toEqual('');
    });

    it('sets loading as false', () => {
      expect(subject.state.loading).toEqual(false);
    });
  });

  describe('reducers', () => {
    it('sets specified payload on setState', () => {
      const currentState = {
        data: 'old data',
        meta: 1,
      };
      const newData = { data: 'new data' };
      expect(subject.reducers.setState(currentState, newData)).toEqual({
        data: newData.data,
        meta: 1,
      });
    });

    it('sets loading as true on startLoading', () => {
      const currentState = {
        data: 'old data',
      };
      expect(subject.reducers.startLoading(currentState)).toEqual({
        data: currentState.data,
        loading: true,
      });
    });


    it('sets loading as false on startLoading', () => {
      const currentState = {
        data: 'old data',
      };
      expect(subject.reducers.stopLoading(currentState)).toEqual({
        data: currentState.data,
        loading: false,
      });
    });
  });

  describe('effects', () => {
    let mockApiResponse;

    beforeEach(() => {
      subject.reducers.setState = jest.fn();
      subject.reducers.startLoading = jest.fn();
      subject.reducers.stopLoading = jest.fn();
    });

    describe('fetch products', () => {
      const productState = {
        pageSize: 10,
        currentPage: 2,
        searchTerm: 'search term from state',
      };
      const effect = (payload) => subject.effects.fetchProducts.call(subject.reducers, payload, { products: productState });

      beforeEach(() => {
        mockApiResponse = {
          data: {
            products: 'products response',
            pages: 10,
            total: 100,
          },
        };
        ammoTestApi.fetchProducts.mockReturnValue(Promise.resolve(mockApiResponse));
      });

      it('starts loading before request is made', () => {
        effect();
        expect(subject.reducers.startLoading).toBeCalledWith();
      });

      it('fetches products from api using parameters from payload when specified', async () => {
        await effect({ searchTerm: 'term', pageSize: 2, page: 20 });
        expect(ammoTestApi.fetchProducts).toBeCalledWith({ searchTerm: 'term', pageSize: 2, page: 20 });
      });

      it('fetches products from api using empty search term when it is specified', async () => {
        await effect({ searchTerm: '' });
        expect(ammoTestApi.fetchProducts).toBeCalledWith(expect.objectContaining({ searchTerm: '' }));
      });

      it('fetches products from api using parameters from store when none is specified in payload', async () => {
        await effect();
        expect(ammoTestApi.fetchProducts).toBeCalledWith({
          searchTerm: productState.searchTerm,
					pageSize: productState.pageSize,
					page: productState.currentPage,
				});
      });

      it('stops loading after request is made', async () => {
        await effect();
        expect(subject.reducers.stopLoading).toBeCalledWith();
      });

      it('sets items when requests resolves', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          items: mockApiResponse.data.products,
        }));
      });

      it('sets pages when requests resolves', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          pages: mockApiResponse.data.pages,
        }));
      });

      it('sets total when requests resolves', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          total: mockApiResponse.data.total,
        }));
      });

      it('sets page size when requests resolves and when using payload', async () => {
        await effect({ pageSize: 2 });
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          pageSize: 2,
        }));
      });

      it('sets page size when requests resolves and when no using payload', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          pageSize: productState.pageSize,
        }));
      });

      it('sets current page when requests resolves and when using payload', async () => {
        await effect({ page: 20 });
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          currentPage: 20,
        }));
      });

      it('sets current page when requests resolves and when no using payload', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          currentPage: productState.currentPage,
        }));
      });

      it('sets search term when requests resolves and when using payload', async () => {
        await effect({ searchTerm: 'term' });
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          searchTerm: 'term',
        }));
      });

      it('sets search term when requests resolves and when no using payload', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          searchTerm: productState.searchTerm,
        }));
      });
    });
  });
});
