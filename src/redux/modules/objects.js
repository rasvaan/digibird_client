const LOAD = 'objects/LOAD';
const LOAD_SUCCESS = 'objects/LOAD_SUCCESS';
const LOAD_FAIL = 'objects/LOAD_FAIL';

const initialState = {
  // loaded: false,
  // loading: false,
  // platforms: {}
};

export default function objects(state = initialState, action = {}) {
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
          results: action.result
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

export function loadObjects(platform) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    platform: platform,
    promise: (client) => client.get(`/api/objects?platform=${platform}&genus=pica&species=pica`)
  };
}
