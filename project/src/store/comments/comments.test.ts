import { FetchStatus } from '../../const/const';
import { fetchCommentsAction, postCommentAction } from '../api-actions';
import { makeFakeReviews } from '../../mocks/mocks';
import { CommentsData } from '../../types/state';
import { datatype } from 'faker';
import { commentsData } from './comments';

const comments = Array.from({ length: datatype.number(10) }, () =>
  makeFakeReviews()
);

describe('Reducer: commentsData', () => {
  let initialState: CommentsData;

  beforeEach(() => {
    initialState = {
      comments: [],
      commentsStatus: FetchStatus.Idle,
      commentStatus: FetchStatus.Idle,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  describe('fetchCommentsAction test', () => {
    it('should update commentsStatus to "Loading" when pending', () => {
      expect(
        commentsData.reducer(initialState, {
          type: fetchCommentsAction.pending.type,
        })
      ).toEqual({ ...initialState, commentsStatus: FetchStatus.Loading });
    });

    it('should update commentsStatus by load comments', () => {
      expect(
        commentsData.reducer(initialState, {
          type: fetchCommentsAction.fulfilled.type,
          payload: comments,
        })
      ).toEqual({
        ...initialState,
        comments,
        commentsStatus: FetchStatus.Success,
      });
    });

    it('should update commentsStatus failed if server is unavailable', () => {
      expect(
        commentsData.reducer(initialState, {
          type: fetchCommentsAction.rejected.type,
        })
      ).toEqual({ ...initialState, commentsStatus: FetchStatus.Failed });
    });
  });

  describe('postCommentAction test', () => {
    it('should update commentStatus to "Loading" when pending', () => {
      expect(
        commentsData.reducer(initialState, {
          type: postCommentAction.pending.type,
        })
      ).toEqual({ ...initialState, commentStatus: FetchStatus.Loading });
      expect(
        commentsData.reducer(initialState, {
          type: postCommentAction.pending.type,
        })
      ).toEqual({ ...initialState, commentStatus: FetchStatus.Loading });
    });

    it('should update commentStatus by update comments', () => {
      expect(
        commentsData.reducer(initialState, {
          type: postCommentAction.fulfilled.type,
          payload: comments,
        })
      ).toEqual({
        ...initialState,
        comments,
        commentStatus: FetchStatus.Success,
      });
    });

    it('should update commentStatus failed if server is unavailable', () => {
      expect(
        commentsData.reducer(initialState, {
          type: postCommentAction.rejected.type,
        })
      ).toEqual({ ...initialState, commentStatus: FetchStatus.Failed });
    });
  });
});
