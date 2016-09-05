const LOAD = 'monitor/LOAD';
const LOAD_SUCCESS = 'monitor/LOAD_SUCCESS';
const LOAD_FAIL = 'monitor/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  platforms: []
};

export default function monitor(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log('PLATFORM load', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('PLATFORM success', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        platforms: action.result.platforms
      };
    case LOAD_FAIL:
      console.log('PLATFORM fail', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadMonitor() {
  console.log('load platforms');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/platforms')
  };
}
