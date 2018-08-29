import React, { Component } from 'react';
import {connect} from 'react-redux';

import { exit } from '../web3/web3';

import { Button, FormGroup, Input, Label, Alert } from 'reactstrap';

class Remove extends Component {
  state = {
    successVisibility: false,
    errorVisibility: false,
    name: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const app = this.props.applications.filter((app) => 
      (app.data.listingName === this.state.name)
    )

    if (app.length === 0) {
      this.setState({errorVisibility: true});
    } else {
      const listingHash = app[0].listingHash;
      exit(listingHash, (error, result) => {
        if (error) {
          console.log(error);
          this.setState({
            errorVisibility: true,
            successVisibility: false
          });
        } else {
          console.log("Remove application success.");
          this.setState({
            successVisibility: true,
            errorVisibility: false
          });
        }
      });
    }
  }

  handleChange = (e) => {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="title">
          <h3>Remove a Listing</h3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Enter listing name: </Label>
            <Input
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button type="submit" color="info" disabled={this.state.name === ''}>Withdraw</Button>
        </form>

        <br />
        {/* Success/error notifications. */}
        {this.state.successVisibility &&
        <Alert color="success">
          <strong><ion-icon name="checkmark-circle"></ion-icon> Successfully withdrew the application.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not withdraw the application. Make sure you are the owner of the listing and the listing name is correct.
        </Alert>
        }
      </div>
    );
  }
}

function mapStateToProps({ applications }) {
  return { 
    applications: Object.keys(applications).map((key) => applications[key])
  };
}

export default connect(mapStateToProps)(Remove);