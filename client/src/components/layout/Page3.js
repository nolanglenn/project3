import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';

class Page3 extends Component {
  render() {
    const { user } = this.props.auth;
  
    return (
      <div>
      <Navbar />
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              <b>Page 3</b>
            </h1>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Page3.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Page3);