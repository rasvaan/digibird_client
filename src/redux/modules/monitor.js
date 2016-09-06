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
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        platforms: action.result.platforms
      };
    case LOAD_FAIL:
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
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/platforms')
  };
}
