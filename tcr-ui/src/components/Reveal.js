import React, { Component } from 'react';
import { revealVote } from '../web3/web3';

import { FormGroup, Label, Input, Button, Alert } from 'reactstrap';

class Reveal extends Component {
  state = {
    successVisibility: false,
    errorVisibility: false,
    file: null,
    fileReader: null,
  }

  componentDidMount() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const vote = JSON.parse(e.target.result);
      revealVote(vote, (error, result) => {
        if (error) {
          console.log(error);
          this.setState({
            errorVisibility: true,
            successVisibility: false
          })
        } else {
          this.setState({
            errorVisibility: false,
            successVisibility: true
          })
        }
      });
    }
    this.setState({ fileReader })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.fileReader.readAsText(this.state.file);
  }

  handleChange = (e) => {
    this.setState({file: e.target.files[0]})
  }

  render() {
    return this.props.appState !== 'reveal' ?
      <div className="font-italic">
        There are no active vote revealing periods for this application.
      </div> : 
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Upload vote result file:</Label>
            <Input
              type="file"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" color="info" disabled={!this.state.file}>Submit</Button>
        </form>
        <br />

        {/* Success/error notifications. */}
        {this.state.successVisibility &&
        <Alert color="success">
          <strong><ion-icon name="checkmark-circle"></ion-icon> Revealed vote successfully.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not commit vote. Make sure the reveal period is still valid.
        </Alert>
        }
      </div>;
  }
}

export default Reveal;