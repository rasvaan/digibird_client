import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({ time: state.info.data.time }))
export default class Banner extends Component {
  static propTypes = {
    time: PropTypes.number
  }

  render() {
    const {time} = this.props;
    const styles = require('./Banner.scss');

    return (
      <div className={styles.banner}>
          <div className={styles.text}>
              <p className={styles.title}>{time && new Date(time).toString()}</p>
          </div>
          <div className={styles.copyright}>De menagerie, Melchior d Hondecoeter, Rijksmuseum</div>
          <img className="img-responsive" src="img/banners/home.jpg" />
      </div>
    );
  }
}
