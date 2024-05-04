import { SET_CANDIDATE_INFO,UPDATE_FILTERS,UPDATE_JD_LIST } from './actionTypes';

export const setCandidateInfo = (info) => ({
  type: SET_CANDIDATE_INFO,
  payload: info
});

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export const updateJdList = (jdList) => ({
  type: UPDATE_JD_LIST,
  payload: jdList,
});