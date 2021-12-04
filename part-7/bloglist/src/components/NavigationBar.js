import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link className='nav-item nav-link' to='/'>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link className='nav-item nav-link' to='/users'>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <em>
              {user.name} logged in{' '}
              <button className='btn btn-dark' onClick={handleLogout}>
                logout
              </button>
            </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
