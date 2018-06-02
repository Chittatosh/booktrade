import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeNav = () => (
  <React.Fragment>
    <NavLink
      className="navbar-brand"
      activeClassName="active"
      exact
      to="/"
      title="/"
    >
      <img src="/booktrade24.png" width="24" height="24" alt="" /> BookTrade
    </NavLink>
    <NavLink
      className="btn btn-success"
      activeClassName="btn-outline-success"
      exact
      to="/"
      title="/"
    >
      Home <i className="fas fa-home" />
    </NavLink>
  </React.Fragment>
);

const SearchBookNav = () => (
  <NavLink
    className="btn btn-primary ml-3"
    activeClassName="btn-outline-primary"
    exact
    to="/searchbooks"
    title="/searchbooks"
  >
    Search/Add Books <i className="fas fa-search-plus" />
  </NavLink>
);

const MyBooksNav = () => (
  <NavLink
    className="btn btn-info ml-3"
    activeClassName="btn-outline-info"
    exact
    to="/mybooks"
    title="/mybooks"
  >
    My Books <i className="fas fa-th" />
  </NavLink>
);

const AuthNav = () => (
  <React.Fragment>
    <NavLink
      className="btn btn-secondary ml-3"
      activeClassName="btn-outline-secondary"
      exact
      to="/createaccount"
      title="/createaccount"
    >
      Create an Account <i className="fas fa-user" />
    </NavLink>
    <NavLink
      className="btn btn-info ml-3"
      activeClassName="btn-outline-info"
      exact
      to="/signin"
      title="/signin"
    >
      Sign In <i className="fas fa-sign-in-alt" />
    </NavLink>
  </React.Fragment>
);

export { HomeNav, SearchBookNav, MyBooksNav, AuthNav };
