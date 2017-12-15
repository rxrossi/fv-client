import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
} from 'reactstrap';

export default class NavBar extends React.Component {
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
              <NavbarBrand href="/">DManager</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
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
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}
