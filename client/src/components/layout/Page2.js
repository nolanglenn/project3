import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { List } from '../List';
import { ListItem } from '../List';
import './style.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      jobs: null,
      filterValue: ''
    };
  }

  componentDidMount() {
    const requestBody = {
      query: `{jobs {
              _id,
              title,
              jobType,
              date,
              creator {
                _id 
              }
            }
          }`
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
        const events = resData.data.jobs;
        this.setState({
          jobs: [...events]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFilterChange = e => {
    const target = e.target;
    const value = target.value;

    this.setState({ filterValue: value });
  };

  viewDetails = id => {
    return this.props.history.push('/page3/');
  };
  render() {
    const { user } = this.props.auth;
    let filteredJobs = this.state.jobs;

    if (!this.state.jobs) {
      return <p>Loading...</p>;
    }
    if (this.state.filterValue) {
      filteredJobs = this.state.jobs.filter(job => {
        return job.jobType === this.state.filterValue;
      });

      //TODO: Break this entire page into smaller components, find a way to put this in the right display area
      // if(filteredJobs.length === 0) {
      //   return <p>No results to display.</p>
      // }
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
                <b style={{ fontSize: '55px' }}>Available Jobs</b>
                <hr style={{ width: '100%' }} />
              </h4>
            </div>

            <div className="input-field col s12 m3 offset-m9">
              <select
                onChange={this.handleFilterChange}
                value={this.state.filterValue}
                style={{ fontSize: '1.75rem' }}
              >
                <option value="">Filter by...</option>
                <option value="Open House">Open House</option>
                <option value="Showing">Showings</option>
                <option value="Title Work">Office/Paperwork</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col s12 center-align">
              <List>
                {filteredJobs.map(jobs => (
                  <ListItem key={jobs._id}>
                    <div className="row">
                      <div className="row" style={{ paddingBottom: '15px' }}>
                        <div className="col s12 m8">
                          <div
                            style={{ textAlign: 'left', margin: '5px 0 5px 0' }}
                            className="col s12"
                          >
                            <h5 style={{ fontSize: '18px' }}>
                              <p
                                style={{
                                  lineHeight: '28px',
                                  fontSize: '30px',
                                  color: 'black',
                                  margin: '5px 0 0 0'
                                }}
                              >
                                <b>{jobs.title}</b>
                              </p>
                            </h5>
                          </div>
                          <div
                            style={{ textAlign: 'left', margin: '0' }}
                            className="col s12"
                          >
                            <h5 style={{ fontSize: '15px' }}>
                              Job Type
                              <p
                                style={{
                                  fontSize: '20px',
                                  color: 'black',
                                  margin: '5px 0 0 0'
                                }}
                              >
                                <i>
                                  <b>{jobs.jobType}</b>
                                </i>
                              </p>
                            </h5>
                          </div>
                          <div
                            style={{ textAlign: 'left', margin: '5px 0 5px 0' }}
                            className="col s12"
                          >
                            <h5 style={{ fontSize: '15px' }}>
                              Job Date
                              <p
                                style={{
                                  fontSize: '20px',
                                  color: 'black',
                                  margin: '5px 0 0 0'
                                }}
                              >
                                <i>
                                  <b>
                                    {new Date(jobs.date).toLocaleDateString()}
                                  </b>
                                </i>
                              </p>
                            </h5>
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            margin: '15px 0 5px 0'
                          }}
                          className="col s12 m4"
                        >
                          {this.props.auth.user.id === jobs.creator._id ? (
                            <React.Fragment>
                              <p style={{ fontSize: '15px', color: 'black' }}>
                                You're the owner of this job
                              </p>
                              <Link
                                className="btn deep-purple"
                                to={{
                                  pathname: '/page3',
                                  search: '?name=' + jobs._id
                                }}
                              >
                                View Details
                              </Link>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Link
                                className="btn deep-purple"
                                to={{
                                  pathname: '/page3',
                                  search: '?name=' + jobs._id
                                }}
                                className="btn"
                              >
                                Explore this opportunity!
                              </Link>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                      <hr />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Page2.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Page2);
