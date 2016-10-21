import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import blog from './blog.js';
import monitor from './monitor.js';
import objects from './objects.js';
import annotations from './annotations.js';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  blog,
  monitor,
  objects,
  annotations
});
