import React, { Component } from 'react';
import { apply } from '../web3/web3';

import { FormGroup, Input, Label, Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import config from '../config/config.json'

class Apply extends Component {
  state = {
    successVisibility: false,
    errorVisibility: false,
    dropdownOpen: false,
    listingName: '',
    registry: 'Math Experts',
    profilePicture: '',
    credential: '',
    deposit: '',
    metadata: ''
  }

  handleChange = (e) => {
    const id = e.target.id;
    this.setState({
      [id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const listing = {
      listingName: this.state.listingName,
      registry: this.state.registry,
      profilePicture: this.state.profilePicture,
      credential: this.state.credential,
      metadata: this.state.metadata
    };
    const deposit = parseInt(this.state.deposit, 10) * config.scale;
    apply(listing, deposit, (error, result) => {
      if (error) {
        console.log(error);
        this.setState({
          errorVisibility: true,
          successVisibility: false
        })
      } else {
        console.log(`Application ${listing.listingName} success.`);
        this.setState({
          successVisibility: true,
          errorVisibility: false
        });
      }
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  getSelectedDropdownItem = (e) => {
    this.setState({
      registry: e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="title">
          <h3>Register Listing</h3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Listing Name: </Label>
            <Input
              type="text"
              id="listingName"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Registry: </Label>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle color="light" caret>
                {this.state.registry}
              </DropdownToggle>
              <DropdownMenu onClick={this.getSelectedDropdownItem}>
                <DropdownItem value="Math Experts">Math Experts</DropdownItem>
                <DropdownItem value="Physics Experts">Physics Experts</DropdownItem>
                <DropdownItem value="Chemistry Experts">Chemistry Experts</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>

          <FormGroup>
            <Label>Profile Picture (URL): </Label>
            <Input
              type="text"
              id="profilePicture"
              onChange={this.handleChange}  
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Credential: </Label>
            <Input
              type="text"
              id="credential"
              onChange={this.handleChange}  
            />
          </FormGroup>
          <FormGroup>
            <Label>Deposit (minimum {config.minDeposit / config.scale} tokens): </Label>
            <Input
              type="text"
              id="deposit"
              onChange={this.handleChange}  
            />
          </FormGroup>
          <FormGroup>
            <Label>Metadata: </Label>
            <Input
              type="text"
              id="metadata"
              onChange={this.handleChange}  
            />
          </FormGroup>

          <Button type="submit" color="info">Submit Application</Button>
        </form>
        <br />
        {this.state.successVisibility &&
        <Alert color="success">
          <strong><ion-icon name="checkmark-circle"></ion-icon> Application created successfully.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not create application. Make sure your account has sufficient ballance and the listing name is not in the registry.
        </Alert>
        }
      </div>
    );
  }
}

export default Apply;