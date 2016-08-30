const LOAD = 'statistics/LOAD';
const LOAD_SUCCESS = 'statistics/LOAD_SUCCESS';
const LOAD_FAIL = 'statistics/LOAD_FAIL';

const initialState = {
  loaded: false,
  statistics: []
};

export default function statistics(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      console.log('STATISTICS load', action);
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('STATISTICS success', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        statistics: action.result
      };
    case LOAD_FAIL:
      console.log('STATISTICS fail', action);
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

export function isLoaded(globalState) {
  return globalState.statistics && globalState.statistics.loaded;
}

export function loadStatistics() {
  console.log('load statistics');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/statistics?platform=xeno-canto')
  };
}
