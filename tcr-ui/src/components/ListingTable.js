import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

class ListingTable extends Component {
  render() {
    const listings = this.props.listings;

    return (
      <div>
        <Button
          id={this.props.id}
          onClick={this.props.handleTabChange}
          className="tab text-left"
          color="info"
          size="sm"
          block
        >
          {this.props.name} ({this.props.listings.length}) <ion-icon name="arrow-dropdown"></ion-icon>
        </Button>
        <Collapse isOpen={this.props.currentTab === this.props.id}>
          <ListGroup>
            {
            listings.length > 0 ?
              listings.map((application) => {
                const listingHash = application.listingHash;
                return (
                  <ListGroupItem key={listingHash}>
                    <Link to={`/applications/${listingHash}`} className="listing">{application.data.listingName}</Link>
                  </ListGroupItem>
              )}) :
              <ListGroupItem>
                No listings in this category.
              </ListGroupItem>
            }
          </ListGroup>
        </Collapse>
      </div>
    )
  }
}

export default ListingTable;
