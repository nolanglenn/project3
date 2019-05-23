import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
 
class Comment extends Component {
  render() {

    const { user } = this.props.auth;

    return (
        <div style={{textAlign: 'center'}} className='row z-depth-0'>
          <div className='col s2'>
            <Avatar style={{margin: '10px auto 10px auto'}} name={this.props.auth.user.name} src='' size="60" round={true}/>
          </div>
          <div className='col s10'>
            <p style={{textAlign: 'left'}}>
              <strong>{this.props.comment.name}</strong>
              <br />
              {this.props.comment.comment}
            </p>
            <hr style={{margin: '35px 0 0 0'}}></hr>
          </div>
        </div>
    );
  }
}

Comment.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Comment);