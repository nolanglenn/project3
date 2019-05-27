import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import Compiled from './Commenting/components/Compiled';
import Button from './Button/Button';
import './style.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { log } from 'util';
// eslint-disable-next-line no-restricted-globals

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      )}
    </GoogleMap>
  ))
);

class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* load comments in array from database */
      comments: [],
      newComment: {
        originUser: this.props.auth.user.id,
        imageURL: '',
        comment: '',
        name: this.props.auth.user.name
      },
      errors: '',
      currentJob: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-restricted-globals
    let params = new URLSearchParams(location.search);
    let searchId = params.get('name');

    const requestBody = {
      query: `
          query 
            selectedJob($jobId:ID) {
              selectedJob(jobId:$jobId){
                _id
                title
                notes
                address
                geocodeLat
                geocodeLng
                jobType
                compensation
                date
                creator{
                  _id
                }
              }
              
          }
        `,
      variables: {
        jobId: searchId
      }
    };

    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }

        return res.json();
      })
      .then(resData => {
        const events = resData.data.selectedJob;
        this.setState({
          currentJob: { ...events }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { user } = this.props.auth;
    if (!this.state.currentJob) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Navbar />

        <div
          className="container"
          style={{ width: '80%', margin: '1rem auto' }}
        >
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Job Detail</b>
                <hr style={{ width: '80%' }} />
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>{this.state.currentJob.title}</b>
              </h4>
              <div style={{ margin: '40px auto 10px auto' }}>
                <Button
                  creator={this.state.currentJob.creator._id}
                  jobId={this.state.currentJob._id}
                />
              </div>
            </div>
          </div>

          <div
            className="row center-align"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className="col m6 s12">
              <h5 style={{ display: 'block' }}>
                <b>Date of Job</b>
              </h5>
              <h6>{new Date(+this.state.currentJob.date).toString()}</h6>
            </div>
            <div className="col m6 s12">
              <h5>
                <b>Compensation</b>
              </h5>
              <h6>$ {this.state.currentJob.compensation}</h6>
            </div>
          </div>

          <hr />
          <br />

          <br />

          <div className="row">
            <div className="col s12 m6">
              <h5>
                <b>Notes</b>
              </h5>
              <h6>{this.state.currentJob.notes}</h6>
            </div>
            <div className="col s12 m6 contentSections">
              <h5>
                <b>Map</b>
              </h5>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfJNJ2bbBofLbgi4T55vXkNGLSA7LsPlM&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                lat={this.state.currentJob.geocodeLat}
                lng={this.state.currentJob.geocodeLng}
              />
            </div>

            <div
              style={{ textAlign: 'center', margin: '45px auto 0 auto' }}
              className="col s12"
            />
          </div>
          <br />
          <hr />

          <Compiled />
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
