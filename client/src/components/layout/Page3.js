import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import "./style.css";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))



class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      currentJob: null
    };

  }

  componentDidMount() {
    //TODO: make api call to grab selected job detail, pass those values in below...
    setTimeout(() => {
      this.setState({
        currentJob: {
          originUser: this.props.auth.user.id,
          jobTitle: 'Temp Job - Open House',
          compensation: '$50',
          jobType: 'Open House',
          address: '5312 Bull Run, Austin, TX',
          geocodeLat:
            30.4216151,
          geocodeLng:
            -97.7417339,
          date: '08/12/2019',
          notes: 'Here are some notes to fill the space. Hey look, what a cool map!'
        }
      })
    }, 1000)
  }

  render() {
    const { user } = this.props.auth;
    if (!this.state.currentJob) {
      return <p>Loading...</p>
    }
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
                <b>{this.state.currentJob.jobTitle}</b>
              </h4>
            </div>
          </div>

          <div className="row center-align" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="col m6 s12" >
              <h5 style={{ display: 'block' }}>Date of Job:</h5>
              <h6>{this.state.currentJob.date}</h6>
            </div>
            <div className="col m6 s12">
              <h5 >Compensation:</h5>
              <h6>{this.state.currentJob.compensation}</h6>
            </div>
          </div>

          <hr style={{ width: '80%' }}></hr>
          <br></br>

          <br></br>

          <div className='row'>
            <div className='col s12 m6'>
              <h5 >Notes:</h5>
              <h6>{this.state.currentJob.notes}</h6>
            </div>
            <div className="col s12 m6 contentSections">

              <h5 >Map:</h5>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=  &v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                lat={this.state.currentJob.geocodeLat}
                lng={this.state.currentJob.geocodeLng}
              />



            </div>
          </div>

          <div className='row'>
            <div className="col s12 m6 contentSections">

              <h5 >Comments:</h5>
              <h6>ALL COMMENTS TO DISPLAY HERE</h6>

            </div>
          </div>

          <a class="waves-effect waves-light btn">HERE IS A BUTTON TO ACCEPT OR CLOSE A JOB</a>
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

