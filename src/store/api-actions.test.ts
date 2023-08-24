import { Action } from 'redux';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../const';
import { changeFavoritesStatusAction, checkAuthAction, fetchFavoritesAction, fetchFullOfferAction, fetchNeigbourhoodOffersAction, fetchOffersAction, fetchReviewsOfferAction, loginAction, logoutAction, postReviewAction } from './api-actions';
import { makeFakeFullOffer, makeFakeOffersList, makeFakePostReview, makeFakeReviewList } from '../utils-for-test/mocks';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({type}) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({OFFERS: {offers: []}});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" & "checkAuthAction.fullfiled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    describe('fetchOffersAction', () => {
      it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
        const mockOffers = makeFakeOffersList();
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

        await store.dispatch(fetchOffersAction());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.fulfilled.type,
        ]);

        expect(fetchOffersActionFulfilled.payload)
          .toEqual(mockOffers);
      });

      it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

        await store.dispatch(fetchOffersAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.rejected.type,
        ]);
      });
    });

    describe('loginAction', () => {
      it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
        const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
        const fakeServerReplay = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

        await store.dispatch(loginAction(fakeUser));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          loginAction.pending.type,
          fetchOffersAction.pending.type,
          fetchFavoritesAction.pending.type,
          loginAction.fulfilled.type,
        ]);
      });

      it('should call "saveToken" once with the received token', async () => {
        const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
        const fakeServerReplay = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
        const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

        await store.dispatch(loginAction(fakeUser));

        expect(mockSaveToken).toBeCalledTimes(1);
        expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
      });
    });

    describe('logoutAction', () => {
      it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

        await store.dispatch(logoutAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          logoutAction.pending.type,
          fetchOffersAction.pending.type,
          logoutAction.fulfilled.type,
        ]);
      });

      it('should one call "dropToken" with "logoutAction"', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
        const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

        await store.dispatch(logoutAction());

        expect(mockDropToken).toBeCalledTimes(1);
      });
    });

    describe('fetchFullOfferAction', () => {
      const mockFullOffer = makeFakeFullOffer();

      it('should dispatch "fetchFullOfferAction.pending", "fetchFullOfferAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockFullOffer.id}`).reply(200, mockFullOffer);

        await store.dispatch(fetchFullOfferAction(mockFullOffer.id));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchFullOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFullOfferAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchFullOfferAction.pending.type,
          fetchFullOfferAction.fulfilled.type,
        ]);

        expect(fetchFullOfferActionFulfilled.payload)
          .toEqual(mockFullOffer);
      });

      it('should dispatch "fetchFullOfferAction.pending", "fetchFullOfferAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockFullOffer.id}`).reply(400, []);

        await store.dispatch(fetchFullOfferAction(mockFullOffer.id));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchFullOfferAction.pending.type,
          fetchFullOfferAction.rejected.type,
        ]);
      });
    });

    describe('fetchNeigbourhoodOffers', () => {
      const mockOffers = makeFakeOffersList().slice(0, 3);

      it('should dispatch "fetchNeigbourhoodOffersrAction.pending", "fetchNeigbourhoodOffersAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, mockOffers);

        await store.dispatch(fetchNeigbourhoodOffersAction('1'));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchNeigbourhoodOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNeigbourhoodOffersAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchNeigbourhoodOffersAction.pending.type,
          fetchNeigbourhoodOffersAction.fulfilled.type,
        ]);

        expect(fetchNeigbourhoodOffersActionFulfilled.payload)
          .toEqual(mockOffers);
      });

      it('should dispatch "fetchNeigbourhoodOffersrAction.pending", "fetchNeigbourhoodOffersrAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/1/nearby`).reply(400, []);

        await store.dispatch(fetchNeigbourhoodOffersAction('1'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchNeigbourhoodOffersAction.pending.type,
          fetchNeigbourhoodOffersAction.rejected.type,
        ]);
      });
    });

    describe('fetchReviewsOffer', () => {
      const mockReviews = makeFakeReviewList();

      it('should dispatch "fetchReviewsOfferAction.pending", "fetchReviewsOfferAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${mockReviews[0].offerId}`).reply(200, mockReviews);

        await store.dispatch(fetchReviewsOfferAction(mockReviews[0].offerId));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchReviewsOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsOfferAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchReviewsOfferAction.pending.type,
          fetchReviewsOfferAction.fulfilled.type,
        ]);

        expect(fetchReviewsOfferActionFulfilled.payload)
          .toEqual(mockReviews);
      });

      it('should dispatch "fetchReviewsOfferAction.pending", "fetchReviewsOfferAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.Reviews}/123-123`).reply(400, []);

        await store.dispatch(fetchReviewsOfferAction('123-123'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviewsOfferAction.pending.type,
          fetchReviewsOfferAction.rejected.type,
        ]);
      });
    });

    describe('postReviewAction', () => {
      const mockPostReview = makeFakePostReview();
      const {offerId, comment, rating} = mockPostReview;

      it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${offerId}`).reply(200, mockPostReview);

        await store.dispatch(postReviewAction({offerId, comment, rating}));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          postReviewAction.pending.type,
          postReviewAction.fulfilled.type,
        ]);

        expect(postReviewActionFulfilled.payload)
          .toEqual(mockPostReview);
      });

      it('should dispatch "postReviewAction.pending", "postReviewActionn.rejected" when server response 400', async () => {
        mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${offerId}`).reply(400, []);

        await store.dispatch(postReviewAction({offerId, comment, rating}));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          postReviewAction.pending.type,
          postReviewAction.rejected.type,
        ]);
      });
    });


    describe('fetchFavoritesAction', () => {
      const mockOffers = makeFakeOffersList();

      it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, mockOffers);

        await store.dispatch(fetchFavoritesAction());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchFavoritesAction.pending.type,
          fetchFavoritesAction.fulfilled.type,
        ]);

        expect(fetchFavoritesActionFulfilled.payload)
          .toEqual(mockOffers);
      });

      it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400, []);

        await store.dispatch(fetchFavoritesAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchFavoritesAction.pending.type,
          fetchFavoritesAction.rejected.type,
        ]);
      });
    });

    describe('changeFavoritesStatusAction', () => {
      const mockOffer = makeFakeFullOffer();

      it('should dispatch "changeFavoritesStatusAction.pending", "changeFavoritesStatusAction.fulfilled", when server response 200', async() => {
        mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockOffer.id}/${+mockOffer.isFavorite}`).reply(200, mockOffer);

        await store.dispatch(changeFavoritesStatusAction({offerId: mockOffer.id, isFavorite: mockOffer.isFavorite}));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const changeFavoritesStatusActionFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoritesStatusAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          changeFavoritesStatusAction.pending.type,
          changeFavoritesStatusAction.fulfilled.type,
        ]);

        expect(changeFavoritesStatusActionFulfilled.payload)
          .toEqual(mockOffer);
      });

      it('should dispatch "changeFavoritesStatusAction.pending", "changeFavoritesStatusAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockOffer.id}/${+mockOffer.isFavorite}`).reply(400, []);

        await store.dispatch(changeFavoritesStatusAction({offerId: mockOffer.id, isFavorite: mockOffer.isFavorite}));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          changeFavoritesStatusAction.pending.type,
          changeFavoritesStatusAction.rejected.type,
        ]);
      });
    });

  });
});
