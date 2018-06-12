import subject from './index';
import ammoTestApi from '../../clients/ammoTestApi';

jest.mock('../../clients/ammoTestApi');

describe('products model', () => {
  describe('initial state', () => {
    it('set items as empty array', () => {
      expect(subject.state.items).toEqual([]);
    });
  });

  describe('reducers', () => {
    const currentState = { items: [] };

    it('sets specified items on setItems', () => {
      const newItems = 'new items';
      expect(subject.reducers.setItems(currentState, newItems)).toEqual({
        items: newItems,
      });
    });
  });

  describe('effects', () => {
    let mockApiResponse;

    beforeEach(() => {
      subject.reducers.setItems = jest.fn();
    });

    describe('fetch products', () => {
      beforeEach(() => {
        mockApiResponse = {
          data: {
            products: 'products response',
          },
        };
        ammoTestApi.fetchProducts.mockReturnValue(Promise.resolve(mockApiResponse));
      });

      it('sets items when requests resolves', async () => {
        await subject.effects.fetchProducts.call(subject.reducers);
        expect(subject.reducers.setItems).toBeCalledWith(mockApiResponse.data.products);
      });
    });
  });
});
