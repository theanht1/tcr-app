import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import { updateStatus } from '../web3/web3';

class UpdateStatus extends Component {
  state = {
    successVisibility: false,
    errorVisibility: false
  }

  handleUpdateStatus = () => {
    updateStatus(this.props.listingHash, (error, result) => {
      if (error) {
        console.log(error);
        this.setState({
          errorVisibility: true,
          successVisibility: false,
        });
      } else {
        console.log('Update status success.');
        this.setState({ 
          successVisibility: true, 
          errorVisibility: false,
        });
        window.location.reload(true);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return this.props.appState !== 'updateStatus' ?
      <div className="font-italic">
        Cannot update the listing's status right now.
      </div> :
      <div>
        <div>
          <Button color="link" onClick={this.handleUpdateStatus}>Update status of this application</Button>
        </div>

        <br />
        {/* Success/error notifications. */}
        {this.state.successVisibility &&
        <Alert color="success">
          <strong><ion-icon name="checkmark-circle"></ion-icon> Update status successfully.</strong>
        </Alert>
        }
        {this.state.errorVisibility &&
        <Alert color="danger">
          <strong><ion-icon name="close-circle"></ion-icon> Error:</strong> Could not perform the request.
        </Alert>
        }
      </div>
  }
}

export default UpdateStatus;