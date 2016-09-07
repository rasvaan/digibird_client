import React, {Component, PropTypes} from 'react';
import {Banner, Footer} from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {loadBlogs} from '../../redux/modules/blog';
import {BlogPost} from 'components';
import { asyncConnect } from 'redux-connect';

@connect(
  state => ({
    blogPosts: state.blog.blogPosts,
    loading: state.blog.loading,
    loaded: state.blog.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(loadBlogs());
  }
}])
export default class Blog extends Component {
  static propTypes = {
    blogPosts: PropTypes.array,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
  }

  render() {
    const styles = require('./Blog.scss');
    const {blogPosts, loaded, loading} = this.props;
    let blogPostNodes;

    if (loaded) {
      blogPostNodes = blogPosts.map((post) => {
        return (
          <BlogPost title={post.title} link={post.link} date={post.date} content={post.content} key={post.id} />
        );
      });
    } else if (loading) {
      blogPostNodes = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h3>Loading blog posts</h3>
          </div>
        </div>
      );
    } else if (!loading && !loaded) {
      blogPostNodes = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <h3>Unable to load blog posts</h3>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet title="Blog"/>
        <Banner title="Blog" image="blog" />
        <div className={`${styles.blog} container`}>
          {blogPostNodes}
        </div>
        <Footer />
      </div>
    );
  }
}
