import IssueDetails from "@/pages/IssueDetails/IssueDetails";
import * as actionType from "./ActionTypes";
const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

export const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_ISSUE_REQUESTS:
    case actionType.CREATE_ISSUE_REQUESTS:
    case actionType.DELETE_ISSUE_REQUESTS:
    case actionType.FETCH_ISSUE_BY_ID_REQUESTS:
    case actionType.ASSIGNED_ISSUE_TO_USER_REQUESTS:
    case actionType.UDPATE_ISSUE_STATUS_REQUESTS:
      return { ...state, loading: true, error: null };

    case actionType.FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.issues,
      };

    case actionType.FETCH_ISSUE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails: action.issueDetails,
      };

    case actionType.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.issue],
      };
    case actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id == action.issue.id ? action.issue : issue
        ),
      };
    case actionType.DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter((issue) => issue.id != action.issueId),
      };

    case actionType.UDPATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.issue.id ? action.issue : issue
        ),
        issueDetails:action.issue
      };

    case actionType.FETCH_ISSUE_FAILURE:
    case actionType.CREATE_ISSUE_FAILURE:
    case actionType.DELETE_ISSUE_FAILURE:
    case actionType.FETCH_ISSUE_BY_ID_FAILURE:
    case actionType.ASSIGNED_ISSUE_TO_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
