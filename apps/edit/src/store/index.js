import { createStore, combineReducers } from 'redux';
import * as main from './main';
import * as portion from './portion';

let store = createStore(
  combineReducers({
    ...main,
    ...portion
  })
);

export default store;
