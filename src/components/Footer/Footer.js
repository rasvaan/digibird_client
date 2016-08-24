import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    const styles = require('./Footer.scss');

    return (
      <div className={`container ${styles.footer}`}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <p>DigiBird is a valorisation project funded by the Dutch national program
              <a href="http://www.commit-nl.nl">
                <img className={styles.logo} src="img/logos/commit.png" />
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
