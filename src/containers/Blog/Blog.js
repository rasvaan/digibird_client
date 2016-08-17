import React, {Component, PropTypes} from 'react';
import {Banner, Footer} from 'components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/blog';
import Helmet from 'react-helmet';

@connect(
    state => ({
      blogLoaded: state.blog.loaded,
      blogFetchError: state.blog.loadError,
      blogs: state.blog.blogs
    }),
    dispatch => bindActionCreators({load}, dispatch))
export default class Blog extends Component {
  static propTypes = {
    blogs: PropTypes.object,
    load: PropTypes.func.isRequired,
    blogLoaded: PropTypes.bool,
    blogFetchError: PropTypes.string
  }

  render() {
    const {blogs} = this.props;
    const styles = require('./Blog.scss');
    console.log('render', blogs);
    return (
      <div>
        <Helmet title="Blog"/>
        <Banner title="Blog" image="blog" />
        <div className={styles.taglineContainer + ' container'}>
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
                blogcontents message: {blogs.message}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
