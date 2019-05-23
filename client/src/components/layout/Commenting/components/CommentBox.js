import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
 
class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }
  addComment(e) {
    // Prevent the default behaviour of form submit
    e.preventDefault();
    console.log(this.props.auth.user.id);
   
    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = e.target.elements.comment.value.trim();
    const name = this.props.auth.user.name;
    const originUser = this.props.auth.user.id;
    const imageURL = 'image';
   
    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment, originUser, imageURL };
   
      this.props.handleAddComment(commentObject);
   
      // Publish comment
      /*global Ably*/
      const channel = Ably.channels.get('comments');
      channel.publish('add_comment', commentObject, err => {
        if (err) {
          console.log('Unable to publish message; err = ' + err.message);
        }
      });
   
      // Clear input fields
      e.target.elements.comment.value = '';
      // e.target.elements.name.value = '';
    }
  }
 
  render() {

    const { user } = this.props.auth;
    
    return (
      <div>
        <form onSubmit={this.addComment}>
          <div className="row">
            <div className="input-field col s12">
                <h5>Comments</h5>
            </div>
            <div style={{margin: '0 10px 0 10px'}} className='input-field col s12'>
                <div className='row'>
                    <div className='col s2'>
                        <Avatar style={{margin: '10px auto 10px auto'}} name={this.props.auth.user.name} src='' size="60" round={true}/>
                    </div>
                    <div className="input-field col s9">
                        <textarea name='comment' id="textarea" className="materialize-textarea"></textarea>
                        <label for="textarea">Add a Comment</label>
                    </div>
                    <div style={{textAlign: 'right'}} className="input-field col s1">
                        <button className="btn-floating deep-purple">+</button>
                    </div>
                </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CommentBox.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(CommentBox);
 