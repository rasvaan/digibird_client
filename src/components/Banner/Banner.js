import React, {Component, PropTypes} from 'react';

export default class Banner extends Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string
  }

  render() {
    const styles = require('./Banner.scss');

    return (
      <div className={styles.banner}>
          <div className={styles.text}>
              <p className={styles.title}>{this.props.title}</p>
          </div>
          <div className={styles.copyright}>De menagerie, Melchior d'Hondecoeter, Rijksmuseum</div>
          <img className="img-responsive" src={'img/banners/' + this.props.image + '.jpg'} />
      </div>
    );
  }
}
