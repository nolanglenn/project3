import React from 'react';
import PropTypes from 'prop-types';
import DeleteJob from './DeleteJob';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      /* need to save clickCount Number */
      /* 0 = Open Job, 1 = Job Taken, 2 = Job Completed/Needing Payment, 3 = Payment Complete, 4 = Job Archived */
      clickCount: 0,
      /* using the id from the saved post of the person who posted it*/
      originUser: this.props.creator,
      user: this.props.auth.user.id,
      UserButtonClass: '',
      OwnerButtonClass: '',
      booked: ''
    };
  }

  setCorrectStatus() {
    const userStatus = [
      'Take Job',
      'Job Complete',
      'Awaiting Payment',
      'Payment Recieved'
    ];
    const ownerStatus = [
      'Awaiting Someone to Take Job',
      'Awaiting Completion of Job',
      'Payment Sent',
      'Close Job'
    ];

    if (this.state.user !== this.state.originUser) {
      const stat = userStatus[this.state.clickCount];
      this.setState({ status: stat });
    } else {
      this.setState({ status: ownerStatus[this.state.clickCount] });
    }
  }

  componentDidMount = () => {
    this.setCorrectStatus();
    this.statusChange();
  };

  statusChange = () => {
    if (this.state.clickCount === 4) {
      this.endJob();
    }
    if (this.state.user !== this.state.originUser) {
      switch (this.state.clickCount) {
        case 0: {
          this.setState({ status: 'Take Job' });
          this.setState({ clickCount: this.state.clickCount + 1 });
          this.setState({ UserButtonClass: 'waves-effect btn-small blue' });
          console.log(this.state);
          break;
        }
        case 1: {
          this.setState({ status: 'Job Complete' });
          this.setState({ clickCount: this.state.clickCount + 1 });
          this.setState({ UserButtonClass: 'waves-effect btn-small green' });
          console.log(this.state);
          break;
        }
        case 2: {
          this.setState({ status: 'Awaiting Payment' });
          console.log(this.state);
          this.setState({ UserButtonClass: 'waves-effect btn-small disabled' });
          break;
        }
        case 3: {
          this.setState({ status: 'Payment Recieved' });
          this.setState({ clickCount: this.state.clickCount + 1 });
          console.log(this.state);
          this.setState({ UserButtonClass: 'waves-effect btn-small green' });
          break;
        }
        default:
          return null;
      }
    }
    if (this.state.user === this.state.originUser) {
      switch (this.state.clickCount) {
        case 0: {
          this.setState({ status: 'Awaiting Someone to Take Job' });
          this.setState({
            OwnerButtonClass: 'waves-effect btn-small disabled'
          });
          console.log(this.state);
          break;
        }
        case 1: {
          this.setState({ status: 'Awaiting Completion of Job' });
          this.setState({
            OwnerButtonClass: 'waves-effect btn-small disabled'
          });
          console.log(this.state);
          break;
        }
        case 2: {
          this.setState({ status: 'Payment Sent' });
          this.setState({ clickCount: this.state.clickCount + 1 });
          this.setState({ OwnerButtonClass: 'waves-effect btn-small green' });
          console.log(this.state);
          break;
        }
        case 3: {
          this.setState({ status: 'Close Job' });
          this.setState({ clickCount: this.state.clickCount + 1 });
          this.setState({ OwnerButtonClass: 'waves-effect btn-small red' });
          console.log(this.state);
          break;
        }
        default:
          return null;
      }
    }
  };

  endJob = () => {
    console.log('the job has ended');
  };

  goBack = () => {
    this.setState({ clickCount: 1 });
    this.setState({ status: 'Take Job' });
    this.setState({ UserButtonClass: 'waves-effect btn-small blue' });
  };
  bookJob = jobId => {
    const requestBody = {
      query: `
          mutation bookJob($id: ID!) {
            bookJob(jobId: $id) {
              count
              _id
              createdAt
              updatedAt
              
              user{
                _id
              }
            }
          }
        `,
      variables: {
        id: jobId,
        count: this.state.clickCount
      }
    };

    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        user: this.props.auth.user.id
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const booked = resData.data.bookJob;
        this.setState({ booked: booked, clickCount: booked.count });
        this.statusChange();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        {this.state.status === 'Job Complete' ? (
          <button
            style={{ margin: '2.5px' }}
            onClick={this.goBack}
            className="waves-effect btn-small red"
          >
            Cancel Job
          </button>
        ) : null}
        <button
          onClick={() => {
            this.bookJob(this.props.jobId);
          }}
          style={{ margin: '2.5px' }}
          // onClick={this.statusChange}
          value={this.state.status}
          className={
            this.state.user === this.state.originUser
              ? this.state.OwnerButtonClass
              : this.state.UserButtonClass
          }
        >
          {this.state.status}
        </button>
        <div>
          {this.state.user === this.state.originUser &&
          this.state.clickCount < 1 ? (
            <DeleteJob />
          ) : null}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Button);
