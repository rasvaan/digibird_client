import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <canvas className={styles.navbarStub}></canvas>
        <Navbar fixedTop inverse className={styles.navbar}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <div className={styles.brand} />
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar pullRight>
              <LinkContainer to="/blog">
                <NavItem eventKey={1}>Blog</NavItem>
              </LinkContainer>
              <LinkContainer to="/people">
                <NavItem eventKey={2}>People</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {this.props.children}
        </div>

        <div className={styles.footer + ' container'}>
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <p>DigiBird is a valorisation project funded by the Dutch national program <a href="http://www.commit-nl.nl"><img className={styles.commitLogo} src="img/logos/commit.png" /></a></p>
                </div>
            </div>
        </div>

      </div>
    );
  }
}
