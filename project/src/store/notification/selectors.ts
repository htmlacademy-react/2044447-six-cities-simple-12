import { NameSpace } from '../../const/const';
import { INotification } from '../../types/notification';
import { State } from '../../types/state';

export const getNotifications = (state: State): INotification[] =>
  state[NameSpace.Notifications].notifications;
