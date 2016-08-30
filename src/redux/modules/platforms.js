const LOAD = 'platform/LOAD';
const LOAD_SUCCESS = 'platform/LOAD_SUCCESS';
const LOAD_FAIL = 'platform/LOAD_FAIL';

const initialState = {
  loaded: false,
  platformMetadata: []
};

export default function platforms(state = initialState, action = {}) {
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
        platformMetadata: action.result.platforms
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

export function isLoaded(globalState) {
  return globalState.platforms && globalState.platforms.loaded;
}

export function loadPlatforms() {
  console.log('load platforms');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/platforms')
  };
}
