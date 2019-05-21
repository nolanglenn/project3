import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import "./style.css";

class Page3 extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />
      
        <div className="container" style={{ width: '80%', margin: '1rem auto' }}>

          <div className="row" >
            <div className="col s12 center-align">
              <h4>
                <b>Job Detail:</b>
                <hr style={{ width: '80%' }}></hr>
              </h4>
            </div>
          </div>


          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Job / Post Title or ID here:</b>
              </h4>
            </div>
          </div>

          <div className="row center-align" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="col m6 s12" >
              <h5 style={{ display: 'block' }}>Date of Job:</h5>
              <h6>job date here</h6>
            </div>
            <div className="col m6 s12">
              <h5 >Compensation:</h5>
              <h6>$xyz.ab</h6>
            </div>
          </div>

          <hr style={{ width: '80%' }}></hr>
          <br></br>

          <div className="row contentSections" >
            <div>
              <h5 >Notes:</h5>
              <h6>ALL NOTES TO DISPLAY HERE</h6>
            </div>
            <div >
              <div>MAP COULD GO OVER TO THE RIGHT SIDE ---> </div>
            </div>
          </div>

          <br></br>

          <div className="row contentSections">

            <h5 >Comments:</h5>
            <h6>ALL COMMENTS TO DISPLAY HERE</h6>

          </div>

          <br></br>

          <div className="row contentSections">

            <h5 >Map:</h5>
            <h6>OR GOOGLE MAPS TO DISPLAY HERE</h6>

          </div>

          <button></button>
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