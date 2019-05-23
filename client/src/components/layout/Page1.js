import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import Geocode from 'react-geocode';

class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      newPost: {
        originUser: this.props.auth.user.id,
        title: '',
        compensation: '',
        jobType: '',
        address: '',
        geocodeLat: '',
        geocodeLng: '',
        date: '',
        notes: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    console.log(`Input name ${name}. Input value ${value}`);

    this.setState({ newPost: { ...this.state.newPost, [name]: value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.newPost.jobTitle === '' ||
      this.state.newPost.compensation === '' ||
      this.state.newPost.jobType === '' ||
      this.state.newPost.address === '' ||
      this.state.newPost.date === ''
    ) {
      this.setState({
        errors:
          'One or more required input fields are not filled out. Please ammend your job posting.'
      });
      return false;
    } else if (
      this.state.newPost.jobType === 'Other' &&
      this.state.newPost.notes === ''
    ) {
      this.setState({
        errors:
          'You have selected OTHER in the job type field. Please add some notes so a user can understand the job type.'
      });
      return false;
    }

    Geocode.setApiKey('AIzaSyAfJNJ2bbBofLbgi4T55vXkNGLSA7LsPlM');

    if (
      this.state.newPost.title === '' ||
      this.state.newPost.compensation === '' ||
      this.state.newPost.jobType === '' ||
      this.state.newPost.address === '' ||
      this.state.newPost.date === ''
    ) {
      this.setState({
        errors:
          'One or more required input fields are not filled out. Please ammend your job posting.'
      });
      return false;
    } else if (
      this.state.newPost.jobType === 'Other' &&
      this.state.newPost.notes === ''
    ) {
      this.setState({
        errors:
          'You have selected OTHER in the job type field. Please add some notes so a user can understand the job type.'
      });
      return false;
    }
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    //  console.log(this.props.newPost.address);
    Geocode.fromAddress(this.state.newPost.address)
      .then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;

          // geocode.push(lat, lng);
          console.log(lat);
          this.setState({
            newPost: { ...this.state.newPost, geocodeLat: lat, geocodeLng: lng }
          });

          const post = this.state.newPost;
          console.log(post);
        },
        error => {
          console.error(error);
        }
      )
      .then(() => {
        const post = this.state.newPost;
        console.log(post);
        const requestBody = {
          query: `
          mutation CreateJob(
            $title: String!,
            $jobType:String!,
            $notes: String!,
            $compensation: Float!,
            $date: String!,
            $address:String!
            $geocodeLat:Float!,
            $geocodeLng:Float!,
            $creator:String!
            )
            {
            createJob
            (jobInput: {
              title: $title,
              notes: $notes,
              address: $address,
              geocodeLat:$geocodeLat,
              geocodeLng:$geocodeLng,
              compensation: $compensation,
              date: $date,
              jobType:$jobType
              creator:$creator
            })
              {
              _id
              title
              compensation
              jobType
              address
              geocodeLat
              geocodeLng
              date
              notes
            }
          }
        `,
          variables: {
            title: post.title,
            compensation: +post.compensation,
            jobType: post.jobType,
            address: post.address,
            geocodeLat: post.geocodeLat,
            geocodeLng: post.geocodeLng,
            date: post.date,
            notes: post.notes,
            creator: this.props.auth.user.id
          }
        };
        console.log(requestBody);
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

            return this.props.history.push('/page3');
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />
        <div className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h2>
                <b>Post a Job</b>
              </h2>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="col s12">
                      <p
                        style={{
                          color: 'red',
                          maxWidth: '300px',
                          margin: 'auto'
                        }}
                      >
                        {this.state.errors}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.newPost.title}
                        name="title"
                        placeholder=""
                        id="job-title"
                        type="text"
                        className="validate"
                      />
                      <label for="job-title">What do you need help with?</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.newPost.compensation}
                        name="compensation"
                        placeholder=""
                        id="compensation"
                        type="number"
                        min="0"
                        className="validate"
                      />
                      <label for="compensation">Compensation</label>
                    </div>
                    <div className="input-field col s6">
                      <select
                        onChange={this.handleInputChange}
                        value={this.state.newPost.jobType}
                        name="jobType"
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        <option value="Open House">Open house</option>
                        <option value="Showing">Showing</option>
                        <option value="Title Work">Contract/Paperwork</option>
                        <option value="Other">Other</option>
                      </select>
                      <label>Job Type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.newPost.address}
                        name="address"
                        id="address"
                        type="text"
                        className="validate"
                      />
                      <label for="address">Address</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.newPost.date}
                        name="date"
                        type="date"
                        className="validate"
                      />
                      <label for="datepicker">Date</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        onChange={this.handleInputChange}
                        value={this.state.newPost.notes}
                        name="notes"
                        placeholder="Describe the details of this job..."
                        id="notes"
                        type="text"
                        className="materialize-textarea"
                        data-length="250"
                      />
                      <label for="notes">Notes</label>
                    </div>
                  </div>
                  <button
                    onClick={this.handleSubmit}
                    class="btn waves-effect deep-purple accent-3"
                    type="submit"
                    name="action"
                  >
                    Post Job
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
