import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { List } from '../List';
import { ListItem } from '../List';

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
    setTimeout(() => {
      this.setState({
        jobs: [
          {
            // originUser: this.props.auth.user.id,
            jobID: 1,
            jobTitle: 'Temp Job 1- Open House',
            compensation: '$50',
            jobType: 'Open House'
          },
          {
            jobID: 2,
            jobTitle: 'Temp Job 2 - Open House',
            compensation: '$50',
            jobType: 'Open House'
          },
          {
            jobID: 3,
            jobTitle: 'Temp Job 3 - Open House',
            compensation: '$50',
            jobType: 'Open House'
          },
          {
            jobID: 4,
            jobTitle: 'Temp Job 4- Open House',
            compensation: '$50',
            jobType: 'Open House'
          }
        ]
      });
    }, 1000);
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
                  <ListItem>
                    <div className="row">
                      <div className="col-6 col-md-4">
                        <a href={jobs.jobID} target="_blank">
                          <strong style={{ fontSize: '1.5rem' }}>
                            {jobs.jobTitle}
                          </strong>
                        </a>
                        <a
                          className="waves-effect waves-light btn-small"
                          style={{ marginLeft: '20px' }}
                        >
                          Detail
                        </a>
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
