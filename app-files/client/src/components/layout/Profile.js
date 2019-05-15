import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import Avatar from 'react-avatar';
import ImageLink from './Modals/imageLink';

class Profile extends Component {

  render() {
    const { user } = this.props.auth;
  
    return (
      <div>
      <Navbar />
      <div className="container align-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              <b>{user.name.split(" ")[0]}'s Profile Page</b>
            </h1>
          </div>
        </div>
        <div className='row'>
          <div className='col m12 s12 l4'>
            <div style={{textAlign: 'center', position: 'relative'}} className="card-panel white">


            <button style={{position: 'absolute', top: '-15px', right: '-15px'}} className="btn-floating btn-medium deep-purple"><i class="material-icons">image</i></button>
              <span className="white-text">
                <Avatar style={{margin: '12.75px', display: 'inline-flex', verticalAlign: 'middle'}} src='' size={150} name={user.name} round={true}/>
              </span>
            </div>
          </div>
          <div className='col m12 s12 l8'>
            <div style={{position: 'relative'}} className="card-panel white">
            <a style={{position: 'absolute', top: '-15px', right: '-15px'}} className="btn-floating btn-medium deep-purple"><i class="material-icons">edit</i></a>
              <span className="black-text">
                  <h5><b>User Information</b></h5>
                  <h5>{user.name}</h5>
                  <h5>Email</h5>
                  <h5>Title</h5>
              </span>
            </div>
          </div>
          <div className='col m6 s12'>
            <div className="card-panel white">
              <span className="black-text">
                  <h5><b>Posted Jobs</b></h5>
              </span>
            </div>
          </div>
          <div className='col m6 s12'>
            <div className="card-panel white">
              <span className="black-text">
                  <h5><b>Jobs You've Taken</b></h5>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);