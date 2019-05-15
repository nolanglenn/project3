import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';

class Page1 extends Component {
  render() {
    const { user } = this.props.auth;
    
    return (
      <div>
      <Navbar />  
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              <b>Post a job</b>
            </h1>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s6">
                      <input placeholder="Placeholder" id="first_name" type="text" className="validate"></input>
                      <label for="first_name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input id="last_name" type="text" className="validate"></input>
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input disabled value="I am not editable" id="disabled" type="text" className="validate"></input>
                      <label for="disabled">Disabled</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="password" type="password" className="validate"></input>
                      <label for="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="email" type="email" className="validate"></input>
                      <label for="email">Email</label>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Page1.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Page1);