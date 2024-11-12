import * as actionType from "./ActionTypes";
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_COMMENT_REQUESTS:
    case actionType.DELETE_COMMENT_REQUESTS:
    case actionType.FETCH_COMMENT_REQUESTS:
      return { ...state, loading: true, error: null };

    case actionType.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.comment],
      };

    case actionType.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.commentId
        ),
      };

    case actionType.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.comments,
      };

    case actionType.CREATE_COMMENT_FAILURE:
    case actionType.DELETE_COMMENT_FAILURE:
    case actionType.FETCH_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
