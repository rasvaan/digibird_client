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

function sortAnnotations(aggregations) {
  // sort annotation lists
  aggregations.forEach(aggregation => {
    if (aggregation['edm:aggregatedCHO'].annotations) {
      aggregation['edm:aggregatedCHO'].annotations.sort((one, two) => {
        if (one['oa:annotatedAt'] < two['oa:annotatedAt']) return 1;
        if (one['oa:annotatedAt'] > two['oa:annotatedAt']) return -1;
        return 0; // one must be equal to two
      });
    }
  });
  return aggregations;
}

function sortAggregations(aggregations) {
  // sort objects based on first entry annotation list
  return aggregations.sort((one, two) => {
    const dateOne = one['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];
    const dateTwo = two['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];

    if (dateOne < dateTwo) return 1;
    if (dateOne > dateTwo) return -1;
    return 0; // dateOne must be equal to dateTwo
  });
}

function processResults(graph) {
  const results = detangleResults(graph['@graph']);
  const aggregations = relateAnnotationsToObjects(results.aggregations, results.annotations);
  const filteredAggregations = filterNotAnnotatedObjects(aggregations);
  const aggregationsSortedAnnotations = sortAnnotations(filteredAggregations);
  return sortAggregations(aggregationsSortedAnnotations);
}

function filterAdditions(results, oldResults) {
  // filter objects that are not present
  const filtered = results.filter(result => {
    const id = result['edm:aggregatedCHO']['@id'];
    let keep = true;

    oldResults.some(old => {
      const oldId = old['edm:aggregatedCHO']['@id'];

      if (oldId === id) {
        keep = false; // disregard result
        return true; // break out of loop
      }
    });
    return keep;
  });

  return filtered;
}

function processUpdate(newResults, oldResults) {
  // merge in new results if there are already old ones
  if (oldResults) {
    const results = detangleResults(newResults);
    // filter objects in results, extracting the new additions
    const additions = filterAdditions(results.aggregations, oldResults);
    // add annotations to old aggregations
    const oldAggregations = relateAnnotationsToObjects(oldResults, results.annotations);
    // add annotations to new additions
    const newAggregations = relateAnnotationsToObjects(additions, results.annotations);
    // filter additions without annotations
    const filteredAggregations = filterNotAnnotatedObjects(newAggregations);
    // sort annotations new additions
    const sortedAnnotations = sortAnnotations(filteredAggregations);
    // sort new additions
    const sortedAggregations = sortAggregations(sortedAnnotations);
    // concatenate the new additions to the old ones
    return oldAggregations.concat(sortedAggregations);
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
    date: date,
    promise: (client) => client.get(url)
  };
}
