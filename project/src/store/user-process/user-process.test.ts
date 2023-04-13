import { userProcess } from './user-process';
import { AuthorizationStatus, FetchStatus } from '../../const/const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeFakeUserData } from '../../mocks/mocks';
import { UserProcess } from '../../types/state';

const userData = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let initialState: UserProcess;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      info: null,
      fetchStatus: FetchStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userData if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        info: userData,
        fetchStatus: FetchStatus.Success,
      });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.rejected.type,
          userData: null,
        })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
        fetchStatus: FetchStatus.Failed,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update fetchStatus pending', () => {
      expect(
        userProcess.reducer(initialState, {
          type: loginAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        fetchStatus: FetchStatus.Loading,
      });
    });

    it('should update authorizationStatus to "AUTH" and set userData if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: loginAction.fulfilled.type,
          payload: userData,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        info: userData,
        fetchStatus: FetchStatus.Success,
      });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
        fetchStatus: FetchStatus.Failed,
      });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
    });
  });
});
