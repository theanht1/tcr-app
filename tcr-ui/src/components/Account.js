import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ListGroup, ListGroupItem } from 'reactstrap';

import config from '../config/config';

class Account extends Component {
  render() {
    let ether, token, allowance;
    if (this.props.ether && this.props.token && this.props.allowance) {
      ether = this.props.ether.toFixed(config.numberOfDecimalPlaces);
      token = Math.round(this.props.token / config.scale);
      allowance = Math.round(this.props.allowance / config.scale);
    }

    return (
      <div>
        <div className="title">
          <h3>Your Account</h3>
        </div>

        <ListGroup>
          <ListGroupItem>
            <b>Ether:</b> {ether}
          </ListGroupItem>
          <ListGroupItem>
            <b>Tokens:</b> {token}
          </ListGroupItem>
          <ListGroupItem>
            <b>Approved Tokens:</b> {allowance}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  return account;
}

export default connect(mapStateToProps)(Account);