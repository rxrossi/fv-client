/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
} from 'reactstrap';

const NavForLoggedIn = () => (
  <Nav className="ml-auto" pills>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/clients"
      >
        Clients
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/products"
      >
        Products
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/professionals"
      >
        Professionals
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/purchases"
      >
        Purchases
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/sales"
      >
        Sales
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/logout"
      >
        Logout
      </NavLink>
    </NavItem>
  </Nav>
);

const NavForNotLoggedIn = () => (
  <Nav className="ml-auto" pills>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/register"
      >
        Register
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className="nav-link"
        to="/login"
      >
        Login
      </NavLink>
    </NavItem>
  </Nav>
);

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Container className="bg-light">
        <Row>
          <Col>
            <Navbar color="faded" light expand="md">
              <NavLink className="navbar-brand" to="/">DManager</NavLink>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                {
                  this.props.isLogged ?
                    <NavForLoggedIn /> :
                    <NavForNotLoggedIn />
                }
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

NavBar.propTypes = {
  isLogged: PropTypes.string,
};

NavBar.defaultProps = {
  isLogged: undefined,
};

const mapState = state => ({
  isLogged: state.auth.token,
});


export default connect(mapState, null, null, { pure: false })(NavBar);
