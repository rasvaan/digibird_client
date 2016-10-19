import React, {Component, PropTypes} from 'react';

export default class Media extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  render() {
    const styles = require('./Media.scss');

    return (
      <div className={`row ${styles[this.props.color]}`}>
        <div className="col-md-8">
          pretty media with horrendous background colors!
        </div>
        <div className="col-md-4">
          Interesting metadata
        </div>
      </div>
    );
  }
}
