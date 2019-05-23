import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { List } from '../List';
import { ListItem } from '../List';
import './style.css';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      jobs: null
    };
  }

  componentDidMount() {
    //TODO: make api call to grab selected jobs, pass those objects in below...
    const requestBody = {
      query: `
          query {
            jobs {
              _id
              title
              notes
              address
              jobType
              compensation
              date
              creator {
                _id
                email
              }
            }
          }
        `
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

  render() {
    const { user } = this.props.auth;
    if (!this.state.jobs) {
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
                <b>Available Jobs:</b>
                <hr style={{ width: '80%' }} />
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col s12 center-align">
              <List>
                {this.state.jobs.map(jobs => (
                  <ListItem key={jobs._id}>
                    <div className="row list-item">
                      <div className="col-6 col-md-4">
                        <h4>
                          Title:
                          <p>{jobs.title} </p>
                          Type of Job:
                          <p>{jobs.jobType}</p>
                        </h4>
                        <div>
                          {this.props.auth.user.id === jobs.creator._id ? (
                            <React.Fragment>
                              <p>Your the owner of this Job.</p>
                              <button className="btn">View Details</button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <button className="btn">
                                Explore this opportunity!
                              </button>
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
