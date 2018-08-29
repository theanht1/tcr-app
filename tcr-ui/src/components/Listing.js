import React, { Component } from 'react';
import { connect } from 'react-redux';

import { challengeResolved } from '../web3/web3';
import { toMinuteAndSecond } from '../utils';

import { ListGroup, ListGroupItem } from 'reactstrap';
import Actions from './Actions';

class Listing extends Component {
  state = {
    appState: '',
    challenge: null,
    timeTillCommit: -1,
    timeTillReveal: -1,
    collapsed: true,
  }

  componentDidMount() {
    // Update the state every 1 second to show the countdown timer.
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        let timeTillCommit = prevState.timeTillCommit - 1;
        let timeTillReveal = prevState.timeTillReveal - 1;

        return {
          timeTillCommit,
          timeTillReveal,
          // appState
        }
      })
    }, 1000);
    
    this.initState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.initState();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initState = () => {
    const id = this.props.match.params.id;
    const listing = this.props.applications[id];
    let appState = '';
    let challenge = null;

    if (listing) {
      let timeTillCommit = 0;
      let timeTillReveal = 0;

      challengeResolved(listing.challengeID, (resolved) => {
        if (listing.challengeID === '0' || resolved) {
          if (listing.challengeID === '0' && parseInt(listing.appEndDate, 10) < Date.now() / 1000 && !listing.whitelisted) {
            appState = 'updateStatus';
          } else {
            appState = 'challenge';
          }
        } else {
          challenge = this.props.challenges[listing.challengeID];
          
          const currTime = Math.floor(Date.now() / 1000);
          timeTillCommit = parseInt(challenge.commitEndDate, 10) - currTime;
          timeTillReveal = parseInt(challenge.revealEndDate, 10) - currTime;
          
          if (timeTillCommit > 0) {
            appState = 'vote';
          } else if (timeTillReveal > 0) {
            appState = 'reveal';
          } else {
            appState = 'updateStatus';
          }
        }
  
        this.setState({ appState, timeTillCommit, timeTillReveal, challenge });
      });
      
    }
  }

  updateAppState = () => {
    this.setState((prevState) => {
      let appState = '';
      if (prevState.appState === 'challenge') {
        appState = prevState.appState;
      } else {
        if (prevState.timeTillCommit > 0) {
          appState = 'vote';
        } else if (prevState.timeTillReveal > 0) {
          appState = 'reveal';
        } else {
          appState = 'updateStatus';
        }
      }
      return { appState };
    });
  }

  toggleActions = () => {
    // update the appState when clicked on the dropdown as well.
    this.setState((prevState) => {
      return {
        collapsed: !prevState.collapsed
    }})
  }

  render() {
    const id = this.props.match.params.id;
    const listing = this.props.applications[id];

    if (this.state.appState !== '' && listing) {
      const endDate = new Date(parseInt(listing.appEndDate, 10) * 1000); // sec to millisec

      return (
        <div>
          <div className="title bg-dark text-light">
            <img 
              className="profile-picture border d-inline ml-4 mr-3"
              src={listing.data.profilePicture !== '' ?
                listing.data.profilePicture :
                "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
              }
              alt="avatar"  
            />
            <h3 className="d-inline">{listing.data.listingName}</h3>
          </div>
          
          <ListGroup>
            <ListGroupItem><b>Listing Hash:</b> {listing.listingHash}</ListGroupItem>
            <ListGroupItem><b>Registry:</b> {listing.data.registry}</ListGroupItem>
            <ListGroupItem><b>Credential:</b> {listing.data.credential}</ListGroupItem>
            <ListGroupItem><b>Application End Date:</b> {endDate.toLocaleString()}</ListGroupItem>
            <ListGroupItem><b>Metadata:</b> {listing.data.metadata}</ListGroupItem>
          </ListGroup>

          <br />

          {/* Countdown clock */}
          {this.state.timeTillCommit > 0 &&
          <h4>Time left to commit vote: {toMinuteAndSecond(this.state.timeTillCommit)}</h4>}
          {this.state.timeTillCommit < 0 && this.state.timeTillReveal > 0 &&
          <h4>Time left to reveal vote: {toMinuteAndSecond(this.state.timeTillReveal)}</h4>}

          {/* {this.state.appState === 'updateStatus' && <Button
            color="info"
            onClick={this.handleUpdateStatus}
          >Update Status</Button>
          } */}
          <Actions
            appState={this.state.appState}
            updateAppState={this.updateAppState}
            listingHash={id}
            challenge={this.state.challenge}
            timeTillCommit={this.state.timeTillCommit}
            timeTillReveal={this.state.timeTillReveal}
            history={this.props.history}
          />
        </div>
      )
    }

    return <div></div>;
  }
}

function mapStateToProps({ applications, challenges }) {
  return { applications, challenges };
}

export default connect(mapStateToProps)(Listing);