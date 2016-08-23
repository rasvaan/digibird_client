import React, {Component, PropTypes} from 'react';
import {Banner, Footer} from 'components';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {load} from '../../redux/modules/blog';
import {BlogPost} from 'components';
import { asyncConnect } from 'redux-async-connect';

@connect(
  state => ({
    blogPosts: state.blog.blogPosts.posts,
    loadingBlogs: state.blog.loading,
    blogsLoaded: state.blog.loaded
  }),
  {}
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(load());
  }
}])
export default class Blog extends Component {
  static propTypes = {
    blogPosts: PropTypes.array,
    loadingBlogs: PropTypes.bool,
    loadBlogs: PropTypes.func,
    blogsLoaded: PropTypes.bool
  }
  render() {
    const styles = require('./Blog.scss');
    const {blogPosts, blogsLoaded} = this.props;

    return (
      <div>
        <Helmet title="Blog"/>
        <Banner title="Blog" image="blog" />
        <div className={`${styles.taglineContainer} container`}>
          {(blogsLoaded ?
             blogPosts.map((post) => {
               return (
                 <BlogPost content={post.content} key={post.id} />
               );
             })
            : <span>No Blog posts</span>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
