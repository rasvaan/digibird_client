import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import blog from './blog.js';
import monitor from './monitor.js';
import statistics from './statistics.js';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  blog,
  monitor
});
