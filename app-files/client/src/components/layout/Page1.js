import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';

class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobTitle: '',
      compensation: ''
    }
  }

  render() {
    const { user } = this.props.auth;
    
    return (
      <div>
      <Navbar />  
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              <b>Post a Job</b>
            </h1>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input name='jobTitle' placeholder="" id="job-title" type="text" className="validate"></input>
                      <label for="job-title">What do you need help with?</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input name='compensation' placeholder="" id="compensation" type="number" min='0' className="validate"></input>
                      <label for="compensation">Compensation</label>
                    </div>
                    <div className="input-field col s6">
                    <select>
                      <option value="1">Open house</option>
                      <option value="2">Showing</option>
                      <option value="3">Title Work</option>
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
                      <textarea id="notes" type="text" className="materialize-textarea" data-length='250'></textarea>
                      <label for="notes">Notes</label>
                    </div>
                  </div>
                  <button class="btn waves-effect waves-light deep-purple accent-3" type="submit" name="action">Post Job
                    <i class="material-icons right">send</i>
                  </button>       
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