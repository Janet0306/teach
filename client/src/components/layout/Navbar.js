import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import SearchBox from './SearchBox';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
      <Route render={({ history }) => <SearchBox history={history} />} />
      </li>
      <li>
        <Link to="/profiles"  title="students">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Students</span>
        </Link>
      </li>
      <li>
        <Link to="/posts"  title="Posts">
          <i className="fas fa-comments" />{' '}
          <span className="hide-sm">Discussion Board</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard"  title="Dashboard">
          <i className="fas fa-home" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        {user && user.isAdmin === true && (
        <Link to="/admin/userlist"  title="Admin-UserList">
          <i className="fas fa-users" />{' '}
          <span className="hide-sm">Admin - Users</span>
        </Link>
                )}
      </li>

      <li>
        <a onClick={logout} href="#!"  title="Log out">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register"  title="Register">Register</Link>
      </li>
      <li>
        <Link to="/login"  title="Login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark1">
      <h1>
      <Link to='/'  title="Home"> <i className="fas fa-book-open"></i>
      <span className="hide-sm">Teach</span> 
      </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
