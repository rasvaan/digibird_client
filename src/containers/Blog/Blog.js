import React, {Component} from 'react';
import {Banner, Footer} from 'components';
import Helmet from 'react-helmet';

export default class Blog extends Component {
  render() {
    const styles = require('./Blog.scss');

    return (
      <div>
        <Helmet title="Blog"/>
        <Banner title="Blog" image="blog" />
        <div className={`${styles.taglineContainer} container`}>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="col-sm-12">
                <h2>Blog title</h2>
              </div>
              <div className="col-sm-12">
                <h6>
                  <i className="fa fa-clock-o"></i>
                  date
                  <a className="blog-link" href="link"><i className="fa fa-wordpress"></i> Link to post</a>
                </h6>
              </div>
              <div className="col-sm-12">
                blogcontents message
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
