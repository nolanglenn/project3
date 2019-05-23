import React, { Component } from 'react';
import Avatar from 'react-avatar';
 
class Comment extends Component {
  render() {
    return (
        <div style={{textAlign: 'center'}} className='row z-depth-0'>
          <div className='col s2'>
            <Avatar style={{margin: '10px auto 10px auto'}} name="Wim Mostmans" src='' size="60" round={true}/>
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
 
export default Comment;