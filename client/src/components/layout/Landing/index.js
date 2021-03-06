import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import './style.css';
import hands from './hand-shake.png';
import money from './dollar.png';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
        visible : false
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  
  render() {
    return (
      <div style={{overflow: 'scroll'}} className='landing'>
      <div id='parent' style={{ backgroundColor: 'rgba(255, 255, 255, 0.960)', margin: '125px auto 0 auto', borderRadius: '6px'}} className="container valign-wrapper">
        <div id='learnmore'><a value="Open" onClick={() => this.openModal()}>Learn More</a></div>
        <div className="row">
          <div className="col s12 center-align">
            <h2>
              Welcome to Task<b>Trader</b>
            </h2>
            <p className="flow-text grey-text text-darken-1">
              Take Back Your Life One Job at a Time.
            </p>
            <br />
            <a
              style={{
                margin: "1rem",
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
                margin: "1rem",
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
          <Modal
            visible={this.state.visible}
            effect="fadeInDown"
            onClickAway={() => this.closeModal()}
          >
          <div className='Modal' id='modalParent' style={{padding: '12px'}}>
              <div className='container'>
                <div className='row'>
                  <div className='col s12'>
                    <h1>Why Task<b>Trader</b>?</h1>
                  </div>
                  <div className='col s12'>
                    <p>Task<b>Trader</b> is designed to help those in the Real Estate industry gain more work-life flexibility.
                    Whether you have been in the industry for many years or are just starting out, we are here to help. 
                    <br></br><br></br>
                    You can use Task<b>Trader</b> in two ways:
                    <br />
                    <b>One:</b> You can be a <b>Job Poster</b>.
                    <br />
                    <b>Two:</b> You can be a <b>Job Seeker</b>.</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 m6'>
                    <p><b>Job Poster</b><br />
                    Leverage Your Time!<br /><br />
                    Your clients need you around the clock, making work-life balance tough to find.<br />
                    Create time flexibility for life events, family time, or any other conflicting plans.<br />
                    Seasonal demands sometimes require more time than one can provide.<br />
                    Find the ability to scale up, even with limited bandwidth.<br />
                    Get help from other agents within your current brokerage.</p>
                  </div>
                  <div className='col s12 m6'>
                    <p><b>Job Seeker</b><br />
                    Earn more money on your own schedule!<br /><br />
                    Other agents need help to ensure their clients receive around-the-clock service.<br />
                    Pick up more work during seasonal demands or slow-downs.<br />
                    Create new connections and build raport with other agents.<br />
                    Grab new opportunities to scale up your business.<br />
                    Supplement your current income, as often as you'd like!</p>
                  </div>
                </div>
                <div style={{textAlign: 'center'}}>
                <a
                  style={{
                    margin: "1rem",
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable deep-purple darken-4"
                  href="/Register"
                >
                  Get Started
                </a>
                </div>
              </div>
              <a id='close' href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
          </div>
          </Modal>
      </div>
      <div className="row">
        <div id='info' style={{ borderRadius: '6px'}} className="container">
          <div className="col s12 m12 l4">
            <div style={{maxHeight: '300px', overflowY: 'scroll', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.900)'}} className="card darken-1">
              <div className="card-content black-text">
                <img src={hands} className="hand-shake"></img>
                <span style={{margin: '19px auto 0 auto'}} className="card-title black-text center-align"><b>Work Together</b></span><br></br>
                <p>Clients deserve around-the-clock service, but as agents, it's not always convinient.
                  Let your peers step in and help you help your clients. Whether it's an open house, a 
                  single showing, or anything in between, Task Trader makes it easy to post and find jobs
                  in your brokerage.
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m12 l4">
            <div style={{borderRadius: '6px', overflowY: 'scroll', backgroundColor: 'rgba(255, 255, 255, 0.900)'}} className="card darken-1">
              <div style={{maxHeight: '300px', overflowY: 'scroll'}} className="card-content black-text">
               <div style={{fontSize: '30px', textAlign: 'center'}}>
               <i class="material-icons large">home</i>
               </div>
                <span className="card-title black-text center-align"><b>Brokerage Specific</b></span><br></br>
                <p>To use Task<b>Trader</b> you will need to make sure your brokerage is registered with us! If you are, great! If you would like to sign up feel free to contact us or share this site with a brokerage manager.
                </p>
                <div style={{textAlign: 'center'}}>
                  <button style={{margin: '25px auto 0 auto'}} className='btn deep-purple darken-2'>Contact Us!</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m12 l4">
            <div style={{borderRadius: '6px', overflowY: 'scroll', backgroundColor: 'rgba(255, 255, 255, 0.900)'}} className="card darken-1">
              <div style={{maxHeight: '300px', overflowY: 'scroll'}} className="card-content black-text">
                <img src={money} className="money"></img>
                <span style={{margin: '19px auto 0 auto'}} className="card-title black-text center-align"><b>Earn Together</b></span><br></br>
                <p>You can help out your fellow agents AND earn money with Task Trader. Simply accept a job
                  and complete it to start picking up some extra hours! Our service allows you to keep track of your
                  current and upcoming jobs with a chat feature. Browse jobs and get started today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div style={{fontSize: '10px', margin: '110px auto 0 auto'}} className="center-align">Icons made by <a style={{color: 'black'}} href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a style={{color: 'black'}} href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a style={{color: 'black'}} href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </div>
    )
  }
}
export default Landing;