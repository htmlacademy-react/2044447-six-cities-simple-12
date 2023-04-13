import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { INotification } from '../../types/notification';

export type notificationState = {
  notifications: INotification[];
};

const initialState: notificationState = {
  notifications: [],
};

export const notifications = createSlice({
  name: NameSpace.Notifications,
  initialState,
  reducers: {
    pushNotification: (
      state,
      action: PayloadAction<Omit<INotification, 'id'>>
    ) => {
      const id = nanoid();
      state.notifications.push({ id, ...action.payload });
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { pushNotification, clearNotification } = notifications.actions;
