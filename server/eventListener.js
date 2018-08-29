const { Registry } = require('./utils');
const Application = require('./models/Application');

const setupEventListener = async () => {
  // TODO: change fromBlock to contract deploy block
  const blockRange = { fromBlock: 0, toBlock: 'latest' };
  const registryInstance = await Registry.deployed();

  // New application event
  const appEvent = registryInstance._Application(blockRange);
  appEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    saveApplication(result);
  });

  // New challenge event
  const challengeEvent = registryInstance._Challenge(blockRange);
  challengeEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    saveChallenge(result);
  });

  // Challenge update
  const challengeFailedEvent = registryInstance._ChallengeFailed(blockRange);
  challengeFailedEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    updateChallenge(result, false);
  });

  const challengeSucceededEvent = registryInstance._ChallengeSucceeded(blockRange);
  challengeSucceededEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    updateChallenge(result, true);
  });

  // Application whitelisted
  const appWhitelistEvent = registryInstance._ApplicationWhitelisted(blockRange);
  appWhitelistEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    appWhitelisted(result);
  });

  // Application removed
  const appRemovedEvent = registryInstance._ApplicationRemoved(blockRange);
  appRemovedEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    appRemoved(result);
  });

  // Listing removed
  const listingRemovedEvent = registryInstance._ListingRemoved(blockRange);
  listingRemovedEvent.watch((err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    appRemoved(result);
  });
};

const saveApplication = async ({ args }) => {
  const existApp = await Application.findOne({ listingHash: args.listingHash });
  if (existApp) {
    return;
  }

  const newApp = new Application({
    listingHash: args.listingHash,
    deposit: args.deposit.toNumber(),
    appEndDate: args.appEndDate.toNumber(),
    data: args.data,
    applicant: args.applicant,
    isWhitelisted: false,
  });

  newApp.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};


const saveChallenge = async ({ args }) => {
  const existChallenge = await Challenge.findOne({
    listingHash: args.listingHash,
    resolved: false,
  });

  if (existChallenge) {
    return;
  }

  const newChallenge = new Challenge({
    listingHash: args.listingHash,
    challengeID: args.challegeId,
    data: args.data,
    commitEndDate: args.commitEndDate.toNumber(),
    revealEndDate: args.revealEndDate.toNumber(),
    challenger: args.challenger,
    resolved: false,
  });

  newChallenge.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

const updateChallenge = async ({ args: { challengeID } }, isSucceed) => {
  const challenge = await Challenge.findOne({ challengeID });
  if (!challenge) {
    console.log('Challenge not found');
    return false;
  }

  challenge.update({ $set: { resolved: true, isSucceed } });
}

const appWhitelisted = async ({ args: { listingHash } }) => {
  const app = await Application.findOne({ listingHash });
  if (!app) {
    return false;
  }

  return app.update({ $set: { isWhitelisted: true } });
};

const appRemoved = async ({ args: { listingHash } }) => {
  return Application.remove({ listingHash }, { justOne: true });
};

module.exports = setupEventListener;
