import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import { List } from '../List';

class Page2 extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Navbar />

        <div className="container" style={{ width: '80%', margin: '1rem auto' }}>
          <div className="row" >
            <div className="col s12 center-align">
              <h4>
                <b>Available Jobs:</b>
                <hr style={{ width: '80%' }}></hr>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col s12 center-align">
              <List>
                {/* {JOBS.map(JOBS => (
                  <ListItem>
                    <div className="row">
                      <div className="col-6 col-md-4">
                        <a href={job.id} target="_blank">
                          <strong>
                            {job.title}
                          </strong>
                        </a>
                        <button>Detail</button>
                      </div>
                    </div>
                  </ListItem>))} */}
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