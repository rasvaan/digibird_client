const LOAD = 'statistics/LOAD';
const LOAD_SUCCESS = 'statistics/LOAD_SUCCESS';
const LOAD_FAIL = 'statistics/LOAD_FAIL';
const TEST = 'statistics/TEST';

const initialState = {
  loaded: false
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

export function loadStatistics(platform, statistic) {
  const url = `/api/statistics?platform=${platform}&statistic=${statistic}`;
  console.log('DA URL', url);

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url)
  };
}

export function test() {
  return {
    type: TEST
  };
}
