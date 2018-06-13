import subject from './index';
import ammoTestApi from '../../clients/ammoTestApi';

jest.mock('../../clients/ammoTestApi');

describe('products model', () => {
  describe('initial state', () => {
    it('set items as empty array', () => {
      expect(subject.state.items).toEqual([]);
    });

    it('set pages as 0', () => {
      expect(subject.state.pages).toEqual(0);
    });

    it('set current page as 1', () => {
      expect(subject.state.currentPage).toEqual(1);
    });
  });

  describe('reducers', () => {
    it('sets specified items on setItems', () => {
      const currentState = { items: [] };
      const newItems = 'new items';
      expect(subject.reducers.setItems(currentState, newItems)).toEqual({
        items: newItems,
      });
    });

    it('sets specified pages on setPages', () => {
      const currentState = { pages: 0 };
      const newPageCount = 1;
      expect(subject.reducers.setPages(currentState, newPageCount)).toEqual({
        pages: newPageCount,
      });
    });

    it('sets specified current page on setCurrentPage', () => {
      const currentState = { currentPage: 0 };
      const newCurrentPage = 1;
      expect(subject.reducers.setCurrentPage(currentState, newCurrentPage)).toEqual({
        currentPage: newCurrentPage,
      });
    });
  });

  describe('effects', () => {
    let mockApiResponse;

    beforeEach(() => {
      subject.reducers.setItems = jest.fn();
      subject.reducers.setPages = jest.fn();
      subject.reducers.setCurrentPage = jest.fn();
    });

    describe('fetch products', () => {
      beforeEach(() => {
        mockApiResponse = {
          data: {
            products: 'products response',
            pages: 10,
          },
        };
        ammoTestApi.fetchProducts.mockReturnValue(Promise.resolve(mockApiResponse));
      });

      it('sets items when requests resolves', async () => {
        await subject.effects.fetchProducts.call(subject.reducers);
        expect(subject.reducers.setItems).toBeCalledWith(mockApiResponse.data.products);
      });

      it('sets pages when requests resolves', async () => {
        await subject.effects.fetchProducts.call(subject.reducers);
        expect(subject.reducers.setPages).toBeCalledWith(mockApiResponse.data.pages);
      });

      it('sets current page with given payload when requests resolves', async () => {
        await subject.effects.fetchProducts.call(subject.reducers, { page: 2 });
        expect(subject.reducers.setCurrentPage).toBeCalledWith(2);
      });

      it('sets default current page when none is given and when requests resolves', async () => {
        await subject.effects.fetchProducts.call(subject.reducers);
        expect(subject.reducers.setCurrentPage).toBeCalledWith(1);
      });
    });
  });
});
