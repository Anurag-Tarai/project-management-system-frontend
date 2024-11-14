import {
  ACCEPT_INVITATION_REQUESTS,
  CREATE_PROJECTS_REQUESTS,
  CREATE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_REQUESTS,
  DELETE_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BY_ID_REQUESTS,
  FETCH_PROJECTS_BY_ID_SUCCESS,
  FETCH_PROJECTS_REQUESTS,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECTS_REQUESTS,
  SEARCH_PROJECTS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  projects: [],
  loading: false,
  error: null,
  projectDetails: null,
  searchProjects: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUESTS:
    case CREATE_PROJECTS_REQUESTS:
    case DELETE_PROJECTS_REQUESTS:
    case FETCH_PROJECTS_BY_ID_REQUESTS:
    case ACCEPT_INVITATION_REQUESTS:
    case INVITE_TO_PROJECTS_REQUESTS:
      return { ...state, loading: true, error: null };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects,
        error: null,
      };

    case SEARCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        searchProjects: action.projects
      };

    case CREATE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects:[...state.projects, action.projects],
      };
      case FETCH_PROJECTS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projectDetails: action.project,
      };
      case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.filter(project=>project.id !==action.projectId),
      };

    default:
      return state;
  }
};
