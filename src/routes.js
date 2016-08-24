import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Monitor,
    Blog,
    Home,
    People,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="blog" component={Blog}/>
      <Route path="monitor" component={Monitor}/>
      <Route path="people" component={People}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
