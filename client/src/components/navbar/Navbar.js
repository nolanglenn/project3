import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import M from 'materialize-css';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div>
          <nav className="z-depth-3">
            <div className="nav-wrapper deep-purple darken-2">
              <Link
                to="/dashboard"
                className="brand-logo"
                style={{ margin: '0 10px 0 10px' }}
              >
                Task<b>Trader</b>
              </Link>
              <a
                href="#!"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="/page1">Post a Job</Link>
                </li>
                <li>
                  <Link to="/page2">Find a Job 2</Link>
                </li>
                <li>
                  <Link to={{ pathname: '/page3', search: '?id' }}>
                    Temp Job Details 3
                  </Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a onClick={this.onLogoutClick} href="mobile.html">
                    <button className="waves-effect grey lighten-4 btn">
                      <b className="deep-purple-text">Logout</b>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/page1">Post a Job</Link>
            </li>
            <li>
              <Link to="/page2">Find a Job 2</Link>
            </li>
            <li>
              <Link to="/page3/:id">Temp Job Details 3</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a
                style={{ backgroundColor: '#4a148c' }}
                onClick={this.onLogoutClick}
                href="mobile.html"
              >
                <b className="white-text">
                  <i
                    style={{
                      display: 'inline-flex',
                      verticalAlign: 'middle'
                    }}
                    className="small material-icons"
                  >
                    exit_to_app
                  </i>{' '}
                  Logout
                </b>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
