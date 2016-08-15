import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    return Promise.resolve({id: 1});
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {pushState: push}
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <img className={styles.brand} src="digibird-inverted.png" alt="DigiBird"></img>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/blog">
                <NavItem eventKey={1}>Blog</NavItem>
              </LinkContainer>
              <LinkContainer to="/people">
                <NavItem eventKey={2}>People</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className="container footer">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <p>DigiBird is a valorisation project funded by the Dutch national program <a href="http://www.commit-nl.nl"><img className="footerLogo" src="img/logos/commit.png"></img></a></p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
