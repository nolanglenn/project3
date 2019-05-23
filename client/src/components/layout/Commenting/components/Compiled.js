import React, { Component } from 'react';
import CommentBox from './CommentBox';
import Comments from './Comments';
require('../ably');
 
class Compiled extends Component {
  constructor(props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
 
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('comments');
   
    channel.attach();
      channel.once('attached', () => {
        channel.history((err, page) => {
          // create a new array with comments only in an reversed order (i.e old to new)
          const comments = Array.from(page.items.reverse(), item => item.data)
   
          this.setState({ comments });
        });
      });
  }

  handleAddComment(comment) {
    this.setState(prevState => {
      return {
        comments: prevState.comments.concat(comment)
      };
    });

  }
 
  render() {
    return (
      <section className="section">
        <div style={{}} className="container">
            <CommentBox handleAddComment={this.handleAddComment} />
            <Comments comments={this.state.comments.reverse()} />
        </div>
        <button onClick={console.log(this.state.comments)}></button>
      </section>
    );
  }
}
 
export default Compiled;