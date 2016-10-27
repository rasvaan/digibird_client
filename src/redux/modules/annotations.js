const LOAD = 'annotations/LOAD';
const LOAD_SUCCESS = 'annotations/LOAD_SUCCESS';
const LOAD_FAIL = 'annotations/LOAD_FAIL';
const UPDATE = 'annotations/UPDATE';
const UPDATE_SUCCESS = 'annotations/UPDATE_SUCCESS';
const UPDATE_FAIL = 'annotations/UPDATE_FAIL';

const initialState = {
};

function detangleResults(results) {
  const aggregations = [];
  const annos = [];

  // distinguish between aggregations and annotations
  results.forEach(result => {
    switch (result['@type']) {
      case 'ore:Aggregation':
        aggregations.push(result);
        break;
      case 'oa:Annotation':
        annos.push(result);
        break;
      default: break;
    }
  });

  return {'aggregations': aggregations, 'annotations': annos};
}

function relateAnnotationsToObjects(aggregations, annos) {
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

  return aggregations;
}

function filterNotAnnotatedObjects(aggregations) {
  // fitler objects without annotations
  return aggregations.filter(aggregation => {
    return aggregation['edm:aggregatedCHO'].annotations ? true : false;
  });
}

function processResults(graph) {
  const results = detangleResults(graph['@graph']);
  const aggregations = relateAnnotationsToObjects(results.aggregations, results.annotations);
  return filterNotAnnotatedObjects(aggregations);
}

function mergeAdditions(results, oldResults) {
  const merged = oldResults;

  // add objects that are not present
  results.forEach(result => {
    const id = result['edm:aggregatedCHO']['@id'];
    let keep = true;

    // see if results is already there
    oldResults.some(old => {
      const oldId = old['edm:aggregatedCHO']['@id'];

      if (oldId === id) {
        keep = false; // disregard result
        return true; // break out of loop
      }
    });

    if (keep) merged.push(result);
  });

  return merged;
}

function processUpdate(newResults, oldResults) {
  // merge in new results if there are already old ones
  if (oldResults) {
    // split objects and annotations
    const results = detangleResults(newResults);
    // add new objects
    const merged = mergeAdditions(results.aggregations, oldResults);
    // add annotations to aggregations
    return relateAnnotationsToObjects(merged, results.annotations);
  }
  return processResults(newResults);
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
          loaded: true,
          results: processResults(action.result)
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
          loadingAt: new Date(Date.now()).toISOString()
        }
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: false,
          loaded: true,
          results: processUpdate(action.result['@graph'], state[action.platform].results)
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
    promise: (client) => client.get(url)
  };
}
