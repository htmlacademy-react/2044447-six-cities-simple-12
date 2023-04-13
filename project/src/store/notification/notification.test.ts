import { makeFakeNotification } from './../../mocks/mocks';
import {
  clearNotification,
  notifications,
  notificationState,
  pushNotification,
} from './notification';

const notification = makeFakeNotification();

describe('Reducer: notifications', () => {
  let initialState: notificationState;

  beforeEach(() => {
    initialState = {
      notifications: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(
      notifications.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('should push new notification', () => {
    expect(
      notifications.reducer(initialState, {
        type: pushNotification.type,
        payload: notification,
      })
    ).toEqual({ ...initialState, notifications: [notification] });
  });

  it('should clear notification', () => {
    expect(
      notifications.reducer(initialState, clearNotification(notification.id))
    ).toEqual({
      ...initialState,
    });
  });
});
