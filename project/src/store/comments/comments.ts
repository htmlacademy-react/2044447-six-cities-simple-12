import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const/const';
import { Review } from '../../types/review';
import { fetchCommentsAction, postCommentAction } from '../api-actions';

type CommentsData = {
  comments: Review[];
  commentsStatus: FetchStatus;
  commentStatus: FetchStatus;
};

const initialState: CommentsData = {
  comments: [],
  commentsStatus: FetchStatus.Idle,
  commentStatus: FetchStatus.Idle,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.commentsStatus = FetchStatus.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsStatus = FetchStatus.Success;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.commentsStatus = FetchStatus.Failed;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.commentStatus = FetchStatus.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.commentStatus = FetchStatus.Success;
        state.comments = action.payload;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.commentStatus = FetchStatus.Failed;
      });
  },
});
