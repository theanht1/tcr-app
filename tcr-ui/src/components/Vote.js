import React, { Component } from 'react';
import { commitVote } from '../web3/web3';
import config from '../config/config';

import { Button, FormGroup, Alert, Label, Input } from 'reactstrap';

class Vote extends Component {
  state = {
    successVisibility: false,
    errorVisibility: false,
    checked: '',
    tokens: "",
    voteJSON: null
  }

  handleClick = (e) => {
    this.setState({ checked: e.target.value });
  }

  handleChangeTokens = (e) => {
    this.setState({ tokens: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const listingHash = this.props.listingHash;
    const challenge = this.props.challenge;
    const tokens = parseInt(this.state.tokens, 10) * config.scale;

    commitVote(listingHash, challenge, tokens, this.state.checked, (error, voteJSON) => {
      if (error) {
        console.log(error);
        this.setState({
          errorVisibility: true,
          successVisibility: false,
        });
      } else {
        console.log("Commit vote success.");
        console.log(voteJSON);
        this.setState({
          voteJSON,
          successVisibility: true,
          errorVisibility: false,
        });
      }
    })
  }

  // https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  render() {
    return this.props.appState !== 'vote' ?
      <div className="font-italic">
        There are no active voting periods for this application.
      </div> : (
      <div>
        <form>
          <Label><strong>Options</strong></Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="vote" value="1" onClick={this.handleClick}/>
              Approve
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="vote" value="2" onClick={this.handleClick}/>
              Reject
            </Label>
          </FormGroup>
          <br />

          <FormGroup>
            <label><strong>Number of tokens:</strong></label>
            <Input type="text" id="tokens" onChange={this.handleChangeTokens} />
          </FormGroup>
          <Button
            color="info"
            type="submit"
            onClick={this.handleSubmit}
            disabled={this.state.checked === ''}
          >Submit Vote</Button>
        </form>

        {/* Link to download vote json file */}
        {this.state.voteJSON &&
        <Button color="link" onClick={() => this.download('vote.json', JSON.stringify(this.state.voteJSON))}>
          <ion-icon name="download"></ion-icon> Download vote JSON.
        </Button>
        }

        <br />
        {/* Success/error notifications. */}
        {this.state.successVisibility &&
        <Alert color="success">
          <strong><ion-icon name="checkmark-circle"></ion-icon> Voted success.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not commit vote. Make sure your account has sufficient balance and the voting period is still valid.
        </Alert>
        }
      </div>
    );
  }
}

export default Vote;