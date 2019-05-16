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
                    <div className="input-field col s12">
                      <input placeholder="" id="job-title" type="text" className="validate"></input>
                      <label for="job-title">What do you need help with?</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input placeholder="0.00" id="compensation" type="text" className="validate"></input>
                      <label for="compensation">Compensation</label>
                    </div>
                    <div className="input-field col s6">
                    <select>
                      <option value="" disabled selected>Choose the job type</option>
                      <option value="1">Open house</option>
                      <option value="2">Showing</option>
                      <option value="3">Title work</option>
                    </select>
                    <label>Job Type</label>
                  </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="address" type="text" className="validate"></input>
                      <label for="address">Address</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input type="text" className="datepicker"></input>
                      <label for="datepicker">Date</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="notes" type="text" className="validate"></input>
                      <label for="notes">Notes</label>
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