import { makeFakeFullOffer, makeFakeOffersList } from '../../utils-for-test/mocks';
import { changeFavoritesStatusAction, fetchFavoritesAction, fetchFullOfferAction, fetchNeigbourhoodOffersAction, fetchOffersAction } from '../api-actions';
import { offers } from './offers.slice';

describe('Offers Slice', () => {
  const initialState = {
    offers: [],
    fullOffer: null,
    neigbourhoodOffers: [],
    favorites: [],
    isOffersDataLoading: false,
    isFullOfferDataLoading: false,
    isOffersNeighbourhoodLoading: false,
    activeCity: 'Paris',
    hasError: false,
  };

  const emptyAction = {type: ''};

  describe('fetchOffersAction', () => {
    it('should return initial state with empty action', () => {

      const result = offers.reducer(initialState, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with empty action', () => {

      const result = offers.reducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should set "isOffersDataLoading" to "true" with "fetchOffersAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isOffersDataLoading: true,
      };

      const result = offers.reducer(undefined, fetchOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offers" array, "isOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
      const mockoffers = makeFakeOffersList();
      const expectedState = {
        ...initialState,
        offers: mockoffers,
        isOffersDataLoading: false,
      };

      const result = offers.reducer(
        undefined,
        fetchOffersAction.fulfilled(
          mockoffers, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isOffersDataLoading" to "false" with "fetchOffersAction.rejected', () => {
      const expectedState = {
        ...initialState,
        isOffersDataLoading: false,
      };

      const result = offers.reducer(
        undefined,
        fetchOffersAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFullOfferAction', () => {
    it('should set "isFullOfferDataLoading" to "true" & "hasError" to "false" with "fetchFullOfferAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isFullOfferDataLoading: true,
        hasError: false,
      };

      const result = offers.reducer(undefined, fetchFullOfferAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "fullOffer", "isFullOfferDataLoading" to "false" with "fetchFullOfferAction.fulfilled"', () => {
      const mockOffer = makeFakeFullOffer();
      const expectedState = {
        ...initialState,
        fullOffer: mockOffer,
        isFullOfferDataLoading: false,
      };

      const result = offers.reducer(
        undefined,
        fetchFullOfferAction.fulfilled(
          mockOffer, '', '')
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isFullOfferDataLoading" to "false" & "hasError" to "true" with "fetchFullOfferAction.rejected', () => {
      const expectedState = {
        ...initialState,
        isFullOfferDataLoading: false,
        hasError: true,
      };

      const result = offers.reducer(
        undefined,
        fetchFullOfferAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchNeigbourhoodOffersAction', () => {
    it('should set "isOffersNeighbourhoodLoading" to "true" with "fetchNeigbourhoodOffersAction.pending"', () => {
      const expectedState = {
        ...initialState,
        isOffersNeighbourhoodLoading: true,
      };

      const result = offers.reducer(undefined, fetchNeigbourhoodOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offersNearBy", "isOffersNeighbourhoodLoading" to "false" with "fetchNeigbourhoodOffersAction.fulfilled"', () => {
      const mockOffers = makeFakeOffersList().slice(0, 3);
      const expectedState = {
        ...initialState,
        neigbourhoodOffers: mockOffers,
        isOffersNeighbourhoodLoading: false,
      };

      const result = offers.reducer(
        undefined,
        fetchNeigbourhoodOffersAction.fulfilled(
          mockOffers, '', '')
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "isOffersNeighbourhoodLoading" to "false" with "fetchNeigbourhoodOffersAction.rejected', () => {
      const expectedState = {
        ...initialState,
        isOffersNeighbourhoodLoading: false,
      };

      const result = offers.reducer(
        undefined,
        fetchNeigbourhoodOffersAction.rejected
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set "favoriteOffers" with "fetchFavoritesAction.fulfilled"', () => {
      const mockOffers = makeFakeOffersList();

      const expectedState = {
        ...initialState,
        favorites: mockOffers,
      };

      const result = offers.reducer(
        undefined,
        fetchFavoritesAction.fulfilled(
          mockOffers, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeFavoritesStatusAction', () => {
    const mockOffers = makeFakeOffersList();
    const mockOffer = makeFakeFullOffer();

    it('should change "favoriteStatus" farom "false" to "true" & change array "favorites" with "changeFavoritesStatusAction.fulfilled"', () => {
      const offerForChange = {...mockOffer, isFavorite: true};
      const favorites = mockOffers.filter((item) => item.isFavorite === true);
      const favoritesWithNewOffer = favorites.concat(offerForChange);

      const favoritesInitialState = {
        ...initialState,
        favorites: favorites,
      };

      const expectedState = {
        ...initialState,
        favorites: favoritesWithNewOffer,
      };

      const result = offers.reducer(
        favoritesInitialState,
        changeFavoritesStatusAction.fulfilled(
          offerForChange, '', {offerId: offerForChange.id, isFavorite: offerForChange.isFavorite})
      );

      expect(result).toEqual(expectedState);
    });

    it('should change "favoriteStatus" farom "true" to "false" & change array "favorites" with "changeFavoritesStatusAction.fulfilled"', () => {
      const offerForChange = {...mockOffer, isFavorite: false};
      const favorites = mockOffers.filter((item) => item.isFavorite === true);
      const favoritesWithoutAnyOffer = favorites.filter((item) => item.id !== offerForChange.id);

      const favoritesInitialState = {
        ...initialState,
        favorites: favorites,
      };

      const expectedState = {
        ...initialState,
        favorites: favoritesWithoutAnyOffer,
      };

      const result = offers.reducer(
        favoritesInitialState,
        changeFavoritesStatusAction.fulfilled(
          offerForChange, '', {offerId: offerForChange.id, isFavorite: offerForChange.isFavorite})
      );

      expect(result).toEqual(expectedState);
    });
  });
});
