import React, { Component } from 'react';
import { challenge } from '../web3/web3';

import { FormGroup, Label, Input, Alert, Button } from 'reactstrap';

import config from '../config/config';

class Challenge extends Component {
  state = {
    reasoning: '',
    successVisibility: false,
    errorVisibility: false,
  };

  handleChange = (e) => {
    this.setState({ reasoning: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const listingHash = this.props.listingHash;
    challenge(listingHash, this.state.reasoning, (error, result) => {
      if (error) {
        console.log(error);
        this.setState({ errorVisibility: true });
      } else {
        console.log(result);
        console.log("Challenge success.");
        this.setState({ successVisibility: true })
      }
    });
  }

  render() {
    return this.props.appState !== 'challenge' ?
      <div className="font-italic">
        There is already an active challenge for this application.
      </div> :
      <div>
        <div>
          <label>Challenge stake:</label> {config.minDeposit / config.scale} Tokens
        </div>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Reasoning:</Label>
            <Input
              type="textarea"
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button color="info" onClick={this.handleSubmit}>Submit Challenge</Button>
        </form>

        <br />
        {/* Success/error notifications. */}
        {this.state.successVisibility &&
        <Alert color="success">
          <strong>Challenged successfully.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not challenge this application.
        </Alert>
        }
      </div>;
  }
}

export default Challenge;