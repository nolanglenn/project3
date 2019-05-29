import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import './style.css';

class Dashboard extends Component {
  componentDidMount() {}
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />
        <div className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4 id="header">
                <b>Hello, {user.name.split(' ')[0]}</b>
              </h4>
              <h5 id="subheader" className="deep-purple-text darken-2">
                <b>KPAN Realty Brokerage</b>
              </h5>
            </div>
            <div id="largescreeninfo" className="col s12 center-align">
              <h3>
                <b>0 Current Jobs</b> | <b>0 Postings</b>
              </h3>
            </div>
            <div id="smallscreeninfo" className="col s12 center-align">
              <h4 className="smallscreentxt">
                <b>0 Current Jobs</b>
              </h4>
              <h4 className="smallscreentxt">
                <b>0 Postings</b>
              </h4>
            </div>
            <div className="col s12 center-align">
              <h4 id="subheader">
                <Link
                  id="dashboardbutton"
                  to="/page1"
                  className="waves-effect waves-light btn-large deep-purple darken-2"
                >
                  Post a Job
                </Link>
                <Link
                  id="dashboardbutton"
                  to="/page2"
                  className="waves-effect waves-light btn-large deep-purple darken-2"
                >
                  Grab a Job
                </Link>
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
