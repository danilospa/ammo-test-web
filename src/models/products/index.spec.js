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
  });

  describe('effects', () => {
    let mockApiResponse;

    beforeEach(() => {
      subject.reducers.setState = jest.fn();
    });

    describe('fetch products', () => {
      const productState = {
        pageSize: 10,
        currentPage: 2,
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

      it('fetches products from api using parameters from payload when specified', async () => {
        await effect({ pageSize: 2, page: 20 });
        expect(ammoTestApi.fetchProducts).toBeCalledWith({ pageSize: 2, page: 20 });
      });

      it('fetches products from api using parameters from store when none is specified in payload', async () => {
        await effect();
        expect(ammoTestApi.fetchProducts).toBeCalledWith({ pageSize: productState.pageSize, page: productState.currentPage});
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

      it('sets page size when requests resolves and when using payload', async () => {
        await effect({ pageSize: 2, page: 20 });
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
        await effect({ pageSize: 2, page: 20 });
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

      it('sets total when requests resolves', async () => {
        await effect();
        expect(subject.reducers.setState).toBeCalledWith(expect.objectContaining({
          total: mockApiResponse.data.total,
        }));
      });
    });
  });
});
