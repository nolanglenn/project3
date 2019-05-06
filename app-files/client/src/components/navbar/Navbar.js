import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;

return (
      <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper deep-purple darken-2">
            <Link to="/dashboard" className="brand-logo" style={{ margin: "0 0 0 10px" }}>Open<b>House</b></Link>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/page1">Page 1</Link></li>
              <li><Link to="/page2">Page 2</Link></li>
              <li><Link to="/page3">Page 3</Link></li>
              <li><Link to="/profile">Your Profile</Link></li>
              <li><a onClick={this.onLogoutClick} href="mobile.html">Logout</a></li>
            </ul>
          </div>
        </nav>
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