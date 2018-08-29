const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const contract = require('truffle-contract');
const fs = require('fs');

const registryArtifact = require('../build/contracts/Registry.json');
const parameterizerArtifact = require('../build/contracts/Parameterizer.json');
const tokenArtifact = require('../build/contracts/EIP20.json');
const votingArtifact = require('../build/contracts/PLCRVoting.json');

let mnemonic = '';

if (fs.existsSync('secrets.json')) {
  const secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
  ({ mnemonic } = secrets);
}

const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545');
const account = provider.getAddress();
const web3 = new Web3(provider);

const Registry = contract(registryArtifact);
Registry.setProvider(provider);
const Parameterizer = contract(parameterizerArtifact);
Parameterizer.setProvider(provider);
const Token = contract(tokenArtifact);
Token.setProvider(provider);
const Voting = contract(votingArtifact);
Voting.setProvider(provider);

const applyRegistry = async ({ name, data = {} }) => {
  const listingHash = web3.utils.sha3(name);
  const registryInstance = await Registry.deployed();
  const paramInstance = await Parameterizer.deployed();
  const tokenInstance = await Token.deployed();

  const minDeposit = (await paramInstance.get.call('minDeposit')).toNumber();
  console.log(minDeposit, registryInstance.address);

  await tokenInstance.approve(registryInstance.address, minDeposit, { from: account })
    .catch(e => console.log(e));
  //return 0;
  return registryInstance.apply(
    listingHash,
    minDeposit,
    JSON.stringify({ ...data, listingName: name }),
    { from: account, gas: 6000000 },
  );
};

module.exports = {
  provider,
  web3,
  Registry,
  applyRegistry,
};
