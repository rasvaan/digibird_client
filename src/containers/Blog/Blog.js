import React, {Component, PropTypes} from 'react';
import {Banner, Footer} from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {load} from '../../redux/modules/blog'

@connect(
  state => ({
    blogPosts: state.blog.blogPosts,
    loadingBlogs: state.blog.loading,
  }),
  {loadBlogs: load}
)
export default class Blog extends Component {
  static propTypes = {
    blogPosts: PropTypes.object,
    loadingBlogs: PropTypes.bool,
    loadBlogs: PropTypes.func
  }
  componentWillMount() {
    this.props.loadBlogs();
  }
  render() {
    const styles = require('./Blog.scss');
    const {blogPosts, loadingBlogs} = this.props;

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
