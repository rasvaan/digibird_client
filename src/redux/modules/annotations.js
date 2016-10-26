const LOAD = 'annotations/LOAD';
const LOAD_SUCCESS = 'annotations/LOAD_SUCCESS';
const LOAD_FAIL = 'annotations/LOAD_FAIL';
const UPDATE = 'annotations/UPDATE';
const UPDATE_SUCCESS = 'annotations/UPDATE_SUCCESS';
const UPDATE_FAIL = 'annotations/UPDATE_FAIL';

const initialState = {
};

function processResults(results) {
  let aggregations = [];
  const annos = [];

  // distinguish between aggregations and annotations
  results['@graph'].forEach(result => {
    switch (result['@type']) {
      case 'ore:Aggregation': {
        aggregations.push(result);
        break;
      }
      case 'oa:Annotation': {
        annos.push(result);
        break;
      }
      default: {
        break;
      }
    }
  });

  // relate annotations to objects
  annos.forEach(annotation => {
    aggregations.some(aggregation => {
      // match annotation target with object
      if (aggregation['edm:aggregatedCHO']['@id'] === annotation['oa:hasTarget']) {
        // add annotation to object
        if (aggregation['edm:aggregatedCHO'].annotations) {
          aggregation['edm:aggregatedCHO'].annotations.push(annotation);
        } else {
          aggregation['edm:aggregatedCHO'].annotations = [annotation];
        }
        return true; // stop the looping madness
      }
    });
  });

  // fitler objects without annotations
  aggregations = aggregations.filter(aggregation => {
    return aggregation['edm:aggregatedCHO'].annotations ? true : false;
  });

  // sort annotation lists
  aggregations.forEach(aggregation => {
    if (aggregation['edm:aggregatedCHO'].annotations) {
      aggregation['edm:aggregatedCHO'].annotations.sort((one, two) => {
        if (one['oa:annotatedAt'] > two['oa:annotatedAt']) return 1;
        if (one['oa:annotatedAt'] < two['oa:annotatedAt']) return -1;
        return 0; // one must be equal to two
      });
    }
  });

  // sort objects based on first entry annotation list
  aggregations.sort((one, two) => {
    const dateOne = one['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];
    const dateTwo = two['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];

    if (dateOne > dateTwo) return 1;
    if (dateOne < dateTwo) return -1;
    return 0; // dateOne must be equal to dateTwo
  });

  return aggregations;
}

function processUpdate(results, oldResults) {
  // merge in new results if there are already old ones, do not bother for now
  if (oldResults) return oldResults;
  return processResults(results);
}

export default function annotations(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.platform]: {
          loading: true,
          loadingAt: action.date
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: false,
          loaded: false
          // loaded: true,
          // results: processResults(action.result)
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
    case UPDATE:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: true,
          loadingAt: action.date
        }
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: false,
          loaded: true,
          results: processUpdate(action.result, [action.platform].results)
        }
      };
    case UPDATE_FAIL:
      return {
        ...state,
        [action.platform]: {
          loading: false,
          loaded: false,
          error: action.error,
        }
      };
    default:
      return state;
  }
}

export function loadAnnotations(platform) {
  const url = `/api/annotations?platform=${platform}`;
  const date = new Date(Date.now()).toISOString();

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    platform: platform,
    date: date,
    promise: (client) => client.get(url)
  };
}

export function updateAnnotations(platform, date) {
  const url = `/api/annotations?platform=${platform}&since=${date}`;

  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    platform: platform,
    date: date,
    promise: (client) => client.get(url)
  };
}
