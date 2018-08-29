import { getPastEvents } from '../web3/web3';
import { _CHALLENGE } from '../events';
import { registerApplication } from './applications';

export const GET_INITIAL_CHALLENGES = 'GET_INITIAL_CHALLENGES';
export const ADD_CHALLENGE = 'ADD_CHALLENGE';

export function handleGetInitialChallenges() {
  return (dispatch) => {
    getPastEvents(_CHALLENGE, (result) => {
      let challenges = {};
      result.forEach((challenge) => {
        const challengeData = getChallengeData(challenge);
        challenges[challengeData.challengeID] = challengeData
      })
      dispatch(getInitialChallenges(challenges))
    })
  }
}

// add the new challenge and update the challengeID of the challenged listing.
export function handleNewChallenge(challengeEvent, challengedListing) {
  return (dispatch) => {
    const updatedListing = Object.assign({}, challengedListing);
    updatedListing.challengeID = challengeEvent.args.challengeID;
    dispatch(addChallenge(challengeEvent));
    dispatch(registerApplication(updatedListing));
  }
}

function getInitialChallenges(challenges) {
  return {
    type: GET_INITIAL_CHALLENGES,
    challenges
  }
}

function addChallenge(challenge) {
  return {
    type: ADD_CHALLENGE,
    challenge: getChallengeData(challenge)
  }
}

export function getChallengeData(challenge) {
  const values = challenge.args;
  return {
    challengeID: values.challengeID,
    challenger: values.challenger,
    commitEndDate: values.commitEndDate,
    data: values.data,
    listingHash: values.listingHash,
    revealEndDate: values.revealEndDate,
  };
}