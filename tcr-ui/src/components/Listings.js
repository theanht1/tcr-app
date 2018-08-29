import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListingTable from './ListingTable';

import { challengeResolved } from '../web3/web3';

class Listings extends Component {
  state = {
    registry: [],
    applications: [],
    voting: [],
    currentTab: "registry"
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.updateState();
  }

  updateState = () => {
    const registry = [];
    const applications = [];
    const voting = [];

    const allApps = this.props.applications;
    const allChallenges = this.props.challenges;

    allApps.forEach((app) => {
      if (app.challengeID === "0") {
        if (app.whitelisted) {
          registry.push(app);
        } else if (parseInt(app.appEndDate, 10) < Date.now() / 1000) {
          voting.push(app); // app wasn't challenged during the app period so just need to update status.
        } else {
          applications.push(app);
        }
      } else {
        if (parseInt(allChallenges[app.challengeID].revealEndDate, 10) > Date.now() / 1000) {
          // revealEndDate isn't over so it's being voted.
          voting.push(app);
        } else {
          if (app.whitelisted) {
            registry.push(app);
          } else {
            voting.push(app);
          }
        }
      }
    })
    this.setState({ registry, applications, voting });
  }

  handleTabChange = (e) => {
    this.setState({
      currentTab: e.target.id
    });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h3>All Experts</h3>
        </div>

        <div>
          <ListingTable
            id="registry"
            listings={this.state.registry}
            name="Current Experts"
            handleTabChange={this.handleTabChange}
            currentTab={this.state.currentTab}
          />
          <ListingTable
            id="applications"
            listings={this.state.applications}
            name="Pending Applications"
            handleTabChange={this.handleTabChange}
            currentTab={this.state.currentTab}
          />
          <ListingTable
            id="voting"
            listings={this.state.voting}
            name="Challenged Applications"
            handleTabChange={this.handleTabChange}
            currentTab={this.state.currentTab}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ applications, challenges }) {
  return {
    applications: Object.keys(applications).map((application) => {
      return applications[application];
    }),
    challenges
  }
}

export default connect(mapStateToProps)(Listings)
