import React, {Component, PropTypes} from 'react';

export default class BlogPost extends Component {
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    content: PropTypes.string
  }

  prettyDate(dateTime) {
    const date = new Date(dateTime);
    console.log(date);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  render() {
    const styles = require('./BlogPost.scss');
    const {title, link, date, content} = this.props;

    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="col-sm-12">
            <h2>{title}</h2>
          </div>
          <div className="col-sm-12">
            <h5>
              <i className={`${styles.clock} fa fa-clock-o`} />
              <span className={styles.date}>{this.prettyDate(date)}</span>
              <a className={styles.link} href={link}>
                <i className="fa fa-wordpress" />
                <span className={styles.text}>Link to post</span>
              </a>
            </h5>
          </div>
          <div className={`${styles.content} col-sm-12`} dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
      </div>
    );
  }
}
