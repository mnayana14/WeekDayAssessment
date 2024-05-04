import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
