import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>
              Welcome to Task<b>Trader</b>
            </h2>
            <p className="flow-text grey-text text-darken-1">
              Application Details Go Here
            </p>
            <br />
            <a
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable deep-purple darken-4"
              href="/Register"
            >
              Register
            </a>
            <a
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
              href="/Login"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;