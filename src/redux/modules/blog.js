const LOAD = 'blog/LOAD';
const LOAD_SUCCESS = 'blog/LOAD_SUCCESS';
const LOAD_FAIL = 'blog/LOAD_FAIL';

const initialState = {
  loaded: false,
  blogPosts: {}
};

export default function blog(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('BLOG success', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        blogPosts: action.result.posts
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
  return globalState.blog && globalState.blog.loaded;
}

export function loadBlogs() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/blog')
  };
}
