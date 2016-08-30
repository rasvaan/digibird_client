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
    loadingBlogs: state.blog.loading,
    blogsLoaded: state.blog.loaded
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
    blogsLoaded: PropTypes.bool
  }

  render() {
    const styles = require('./Blog.scss');
    const {blogPosts, blogsLoaded} = this.props;

    return (
      <div>
        <Helmet title="Blog"/>
        <Banner title="Blog" image="blog" />
        <div className={`${styles.blog} container`}>
          {(blogsLoaded ?
             blogPosts.map((post) => {
               return (
                 <BlogPost title={post.title} link={post.link} date={post.date} content={post.content} key={post.id} />
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
