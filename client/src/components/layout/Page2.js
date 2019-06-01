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
        console.log('These are all available jobs: ', events);
        this.setState({
          jobs: [...events]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFilterChange = (e) => {
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
      filteredJobs = this.state.jobs.filter((job) => {
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
                <b>Available Jobs:</b>
                <hr style={{ width: '80%' }} />
              </h4>

            </div>

            <div className="input-field col s3 offset-s8">
              <select
                onChange={this.handleFilterChange}
                value={this.state.filterValue} style={{ fontSize: '1.75rem' }}>
                <option value="">Filter by...</option>
                <option value="Open House">Open House</option>
                <option value="Showings">Showings</option>
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
                    <div className="row list-item">
                      <div className="col-8 col-md-6" style={{ display: 'inline-block', paddingBottom: '15px' }}>
                        <div className="col">
                          <h4>
                            Type:
                          <p>{jobs.jobType}</p>
                          </h4>
                        </div>
                        <div className="col">
                          <h4>
                            Title:
                          <p>{jobs.title} </p>
                          </h4>
                        </div>
                        <div className="col">
                          <h4>
                            Date:
                          <p> {new Date(jobs.date).toLocaleDateString()}</p>
                          </h4>
                        </div>
                        <div className="col">
                          {this.props.auth.user.id === jobs.creator._id ? (
                            <React.Fragment>
                              <p>You're the owner of this job</p>
                              <Link
                                className="btn"
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
                                  className="btn"
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
