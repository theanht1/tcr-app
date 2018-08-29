import React, { Component } from 'react';
import Challenge from './Challenge';
import Vote from './Vote';
import Reveal from './Reveal';
import UpdateStatus from './UpdateStatus';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Actions extends Component {
  state = {
    currentAction: 'Actions',
    dropdownOpen: false
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  getSelectedDropdownItem = (e) => {
    this.setState({
      currentAction: e.target.value
    });
    this.props.updateAppState();
  }

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle color="light" caret>
            {this.state.currentAction}
          </DropdownToggle>
          <DropdownMenu onClick={this.getSelectedDropdownItem}>
            <DropdownItem value="Challenge">Challenge</DropdownItem>
            <DropdownItem value="Vote">Vote</DropdownItem>
            <DropdownItem value="Reveal Vote">Reveal Vote</DropdownItem>
            <DropdownItem value="Update Status">Update Status</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <br />

        {this.state.currentAction === 'Challenge' && 
          <Challenge 
            listingHash={this.props.listingHash}
            appState={this.props.appState} 
          />
        }

        {this.state.currentAction === 'Vote' &&
          <Vote
            listingHash={this.props.listingHash}
            challenge={this.props.challenge}
            timeTillCommit={this.props.timeTillCommit}
            appState={this.props.appState}
          />
        }
          
        {this.state.currentAction === 'Reveal Vote' && 
          <Reveal 
            timeTillReveal={this.props.timeTillReveal}
            appState={this.props.appState}
          />
        }

        {this.state.currentAction === 'Update Status' && 
          <UpdateStatus
            listingHash={this.props.listingHash}
            appState={this.props.appState}
            history={this.props.history
            }
          />
        }
      </div>
    );
  }
}

export default Actions;