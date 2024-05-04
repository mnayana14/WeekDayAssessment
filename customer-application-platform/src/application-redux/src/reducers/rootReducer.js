import { combineReducers } from 'redux';
import jdListReducer from './jdListReducer';


const rootReducer = combineReducers({
  candidateInfo: jdListReducer,
});

export default rootReducer;