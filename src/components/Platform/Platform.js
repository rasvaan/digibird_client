import React, {Component, PropTypes} from 'react';

export default class Platform extends Component {
  static propTypes = {
    platforms: PropTypes.object
  }

  render() {
    // const styles = require('./Platform.scss');
    const { platforms } = this.props;

    const platformNodes = platforms.map((platform) => {
      return <span>{platform.name}</span>;
    });

    return (
      <div className="row">
        {platformNodes}
      </div>
    );
  }
}
