const LOAD = 'annotations/LOAD';
const LOAD_SUCCESS = 'annotations/LOAD_SUCCESS';
const LOAD_FAIL = 'annotations/LOAD_FAIL';

const initialState = {
};

export default function annotations(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.platform]: {
          loading: true
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          loaded: true,
          loading: false,
          // results: action.result
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.platform]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}

export function loadAnnotations(platform) {
  // TODO: stub url, should query for timings.
  const url = `/api/objects?platform=${platform}&genus=pica&species=pica`;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    platform: platform,
    promise: (client) => client.get(url)
  };
}
