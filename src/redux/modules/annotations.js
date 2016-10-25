const LOAD = 'annotations/LOAD';
const LOAD_SUCCESS = 'annotations/LOAD_SUCCESS';
const LOAD_FAIL = 'annotations/LOAD_FAIL';

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
    // console.log('anno', aggregation['edm:aggregatedCHO'].annotations);
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
      console.log('can do something');
      return {
        ...state,
        [action.platform]: {
          loaded: true,
          loading: false,
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
    default:
      return state;
  }
}

export function loadAnnotations(platform) {
  const url = `/api/annotations?platform=${platform}`;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    platform: platform,
    promise: (client) => client.get(url)
  };
}
