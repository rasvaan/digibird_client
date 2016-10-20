const LOAD = 'nsr/LOAD';
const LOAD_SUCCESS = 'nsr/LOAD_SUCCESS';
const LOAD_FAIL = 'nsr/LOAD_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  results: {}
};

export default function nsr(state = initialState, action = {}) {
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
        results: action.result
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

export function isLoaded(globalState) {
  return globalState.nsr && globalState.nsr.loaded;
}

export function loadNsr() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/objects?platform=soortenregister&genus=pica&species=pica')
  };
}
