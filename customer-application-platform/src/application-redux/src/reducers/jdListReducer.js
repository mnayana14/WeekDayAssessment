import { SET_CANDIDATE_INFO, UPDATE_FILTERS, UPDATE_JD_LIST } from "../actions/actionTypes";

const initialState = {
  candidateInfo: null
};

const jdListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case UPDATE_JD_LIST:
      return {
        ...state,
        jdList: action.payload,
      };
      case SET_CANDIDATE_INFO:
      return {
        ...state,
        candidateInfo: action.payload
      };
    default:
      return state;
  
  }
};

export default jdListReducer;