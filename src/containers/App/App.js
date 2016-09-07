import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
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
              <IndexLink className={styles.brandLink} to="/">
                <object className={styles.brand} type="image/svg+xml" data="img/logos/digibird-inverted.svg">
                </object>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar pullRight>
              <LinkContainer to="/monitor">
                <NavItem eventKey={1}>Monitor</NavItem>
              </LinkContainer>
              <LinkContainer to="/people">
                <NavItem eventKey={2}>People</NavItem>
              </LinkContainer>
              <LinkContainer to="/blog">
                <NavItem eventKey={3}>Blog</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {this.props.children}
        </div>

      </div>
    );
  }
}
