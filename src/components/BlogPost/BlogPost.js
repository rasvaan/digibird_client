import React, {Component, PropTypes} from 'react';

export default class BlogPost extends Component {
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.string
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="col-sm-12">
            <h2>{this.props.title}</h2>
          </div>
          <div className="col-sm-12">
            <h6>
              <i className="fa fa-clock-o"></i>
              {this.props.date}
              <a className="blog-link" href={this.props.link}><i className="fa fa-wordpress"></i> Link to post</a>
            </h6>
          </div>
          <div className="col-sm-12" dangerouslySetInnerHTML={{__html: this.props.content}}>
          </div>
        </div>
      </div>
    );
  }
}
