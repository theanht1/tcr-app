# Token Curated Registry Implementation

### Introduction
This is the frontend implementation of the Token Curated Registry cryptosystems described here https://medium.com/@ilovebagels/token-curated-registries-1-0-61a232f8dac7. The app uses the Prospect Park TCR implementation at https://github.com/skmgoldin/tcr.

### To run the app
1. Install the necessary packages.
```
npm install
```
2. Clone and deploy the TCR contracts in this repository to a blockchain network https://github.com/skmgoldin/tcr.
3. Copy the address of the deploy `Registry` address and paste it in the `registryAddress` property in the file `./src/config/config.json` of this project.
4. Run the app.
```
npm start
```