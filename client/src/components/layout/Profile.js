import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import Avatar from 'react-avatar';
import { List } from "../List"
import { ListItem } from "../List";

class Profile extends Component {

  state={
    show: false,
    imageURL: '',
    previousImage: '',
  }

  handleChange(e) {
    this.setState({imageURL: e.target.value})
  }

  showModal = e => {
    this.setState({show: !this.state.show});
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  setPrevious = e => {
    this.setState({previousImage: this.state.imageURL})
  }

  onCancel = e => {
    this.setState({imageURL: this.state.previousImage});
    this.setState({previousImage: ''});
  }
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


            <button onClick={(e) => this.setPrevious(e)}style={{position: 'absolute', top: '-15px', right: '-15px'}} className="btn-floating btn-medium deep-purple modal-trigger" href="#modal1"><i class="material-icons">image</i></button>
              <span className="white-text">
                <Avatar style={{margin: '12.75px', display: 'inline-flex', verticalAlign: 'middle'}} src={this.state.imageURL} size={150} name={user.name} round={true}/>
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
                  <List>
                  {/* {this.state.post.map(post => (
                    <ListItem key={user.id}>
                      <div className="row">
                        <div className="col-6 col-md-4">
                          <a href={post.id} target="_blank">
                            <strong>
                              {post.title}
                            </strong>
                          </a>
                          <button>Detail</button>
                        </div>
                      </div>
                    </ListItem>))} */}
                  </List>
              </span>
            </div>
          </div>
          <div className='col m6 s12'>
            <div className="card-panel white">
              <span className="black-text">
                  <h5><b>Jobs You've Taken</b></h5>
                  <List>
                  {/* {this.state.job.map(job => (
                    <ListItem key={user.id}>
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
              </span>
            </div>
          </div>
        </div>
      </div>
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4><b>Update Profile Photo</b></h4>
            <br></br><br></br>
            <div className='row'>
            <div className='col s4'>
              <Avatar style={{margin: '12.75px', display: 'inline-flex', verticalAlign: 'middle'}} src={this.state.imageURL} size={150} name={user.name} round={true}/>
            </div>
            <div class="input-field col s8">
              <i class="material-icons prefix">image</i>
              <textarea onChange={this.handleChange.bind(this)} type='text' name='photolink' value={this.state.imageURL} id="icon_prefix2" class="materialize-textarea"></textarea>
              <label for="icon_prefix2">Image URL</label>
              <span class="helper-text" data-error="wrong" data-success="right">Example: </span>
            </div>
            </div>
          </div>
          <div class="modal-footer">
            <a onClick={(e) => this.onCancel(e)} style={{margin: '0 5px 0 0'}} href="#!" class="modal-close btn-flat red white-text">Cancel</a>
            <a href="#!" onClick={(e) => this.onSubmit} class="modal-close btn-flat green white-text">Update Photo Link</a>
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