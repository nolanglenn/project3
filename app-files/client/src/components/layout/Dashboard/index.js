import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Link } from "react-router-dom";
import Navbar from '../../navbar/Navbar';
import './style.css';


class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
  
    return (
      <div>
      <Navbar />
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1 id='header'>
              <b>Hello, {user.name.split(" ")[0]}</b>
            </h1>
            <h5 id='subheader' className='deep-purple-text darken-2'><b>You're Brokerage Firm Name Here</b></h5>
          </div>
          <div id='largescreeninfo' className='col s12 center-align'>
            <h2>
              <b>0 Current Jobs</b> | <b>0 Postings</b>
            </h2>
          </div>
          <div id='smallscreeninfo' className='col s12 center-align'>
            <h2 className='smallscreentxt'><b>0 Current Jobs</b></h2>
            <h2 className='smallscreentxt'><b>0 Postings</b></h2>
          </div>
          <div className="col s12 center-align">
            <h4 id='subheader'>
              <Link id='dashboardbutton' className='waves-effect waves-light btn-large deep-purple darken-2'>Grab a Job</Link>
              <Link id='dashboardbutton' className='waves-effect waves-light btn-large deep-purple darken-2'>Post a Job</Link>
            </h4>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);