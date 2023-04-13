import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, MAX_COMMENTS, NameSpace } from '../../const/const';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { getSortingComments } from '../../utils/utils';

export const getComments = (state: State): Review[] =>
  state[NameSpace.Comments].comments;

export const getCommentsStatus = (state: State): FetchStatus =>
  state[NameSpace.Comments].commentsStatus;

export const getCommentStatus = (state: State): FetchStatus =>
  state[NameSpace.Comments].commentStatus;

export const getCommentStatusSelector = createSelector(
  [getCommentStatus],
  (status) => ({
    isLoading: status === FetchStatus.Loading,
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Failed,
  })
);

export const sortComments = createSelector(getComments, (state) =>
  state.slice().sort(getSortingComments).slice(0, MAX_COMMENTS)
);
