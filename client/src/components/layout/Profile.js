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

/* need to be sure and update constructor to take in database info. ex: title: {database.value ? database.value : ''} */
  
  constructor () {
    super();
    this.state = {
      show: false,
      imageURL: '',
      previousImage: '',
      email: '',
      previousEmail: '',
      title: '',
      previousTitle: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
 
  /* Modal Functions */
  
  showModal = e => {
    this.setState({show: !this.state.show});
  };
  
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  /* Image Link Input Change */
  
  handleChange(e) {
    this.setState(
      {imageURL: e.target.value})
  }

  /* User Information Change */
  
  handleInputChange = e => { 
    this.setState({ [e.target.name]: e.target.value });
  }

  /* Setting previous state in case of user cancel */

  setPrevious = e => {
    this.setState({previousImage: this.state.imageURL});
    this.setState({previousEmail: this.state.email});
    this.setState({previousTitle: this.state.title});
  }

  onCancel = e => {
    this.setState({imageURL: this.state.previousImage});
    this.setState({previousImage: ''});
    this.setState({email: this.state.previousEmail});
    this.setState({previousEmail: ''});
    this.setState({title: this.state.previousTitle});
    this.setState({previousTitle: ''});
  }

  /* submission functon here is where it will go to the database */

  onSubmit = e => {
    console.log('hello')
    e.preventDefault();
    /* Here is where the information would be sent to the database */
    const userInfo = {
      imageURL: this.state.imageURL,
      email: this.state.email,
      title: this.state.title
    }
    console.log(userInfo);
  }


  /* Rendered Component */

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


            <button onClick={(e) => this.setPrevious(e)} style={{position: 'absolute', top: '-15px', right: '-15px'}} className="btn-floating btn-medium deep-purple modal-trigger" href="#modal1"><i className="material-icons">image</i></button>
              <span className="white-text">
                <Avatar style={{margin: '12.75px', display: 'inline-flex', verticalAlign: 'middle'}} src={this.state.imageURL} size={150} name={user.name} round={true}/>
              </span>
            </div>
          </div>
          <div className='col m12 s12 l8'>
            <div style={{position: 'relative'}} className="card-panel white">
            <button onClick={(e) => this.setPrevious(e)} style={{position: 'absolute', top: '-15px', right: '-15px'}} className="btn-floating btn-medium deep-purple modal-trigger" href="#modal2"><i className="material-icons">edit</i></button>
              <span className="black-text">
                  <h5><b>User Information</b></h5>
                  <h5>{user.name}</h5>
                  <h5>Email: {this.state.email}</h5>
                  <h5>Title: {this.state.title}</h5>
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

        {/* Modal to Update Image Link for Users Avatar */}

        <div style={{textAlign: 'center'}} id="modal1" className="modal">
          <div className="modal-content">
            <h4><b>Update Profile Photo</b></h4>
            <div className='row'>
            <div className='col s12'>
              <Avatar style={{margin: '12.75px', display: 'inline-flex', verticalAlign: 'middle'}} src={this.state.imageURL} size={150} name={user.name} round={true}/>
            </div>
            <div style={{textAlign: 'left'}} className="input-field col s12">
              <i className="material-icons prefix">image</i>
              <textarea onChange={this.handleChange.bind(this)} type='text' name='photolink' value={this.state.imageURL} id="icon_prefix2" className="materialize-textarea"></textarea>
              <label for="icon_prefix2">Image URL</label>
              <span className="helper-text" data-error="wrong" data-success="right">Example: </span>
            </div>
            </div>
          </div>
          <div className="modal-footer">
            <a onClick={(e) => this.onCancel(e)} style={{margin: '0 18px 0 0'}} href="#!" className="modal-close btn-flat red white-text">Cancel</a>
            <a style={{margin: '0 12px 0 0'}} href="#!" onClick={this.onSubmit} className="modal-close btn-flat green white-text">Update Photo Link</a>
          </div>
        </div>
        
        {/* Modal to Update User Information */}
        
        <div style={{textAlign: 'center'}} id="modal2" className="modal">
          <div className="modal-content">
            <h4><b>Update User Information</b></h4>
          </div>
          <form style={{margin: '20px'}}>
            <div className='row'>
            <p style={{textAlign: 'left'}}>Email</p>
            <input type='email' name='email' onChange={this.handleInputChange} />
            <p style={{textAlign: 'left'}}>Job Title</p>
            <input type='text' name='title' onChange={this.handleInputChange} />
            </div>
          </form>
          <div className="modal-footer">
            <a onClick={(e) => this.onCancel(e)} style={{margin: '0 18px 0 0'}} href="#!" className="modal-close btn-flat red white-text">Cancel</a>
            <a style={{margin: '0 12px 0 0'}} href="#!" onClick={this.onSubmit} className="modal-close btn-flat green white-text">Update User Information</a>
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