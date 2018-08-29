const express = require('express');
const contract = require('truffle-contract');
const Web3 = require('web3');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const controllers = require('./controllers');
// const ProductModel = require('./product');
//
// // Contract setup
// const ecommerce_store_artifacts = require('./build/contracts/EcommerceStore.json');
// const EcommerceStore = contract(ecommerce_store_artifacts);
// const provider = new Web3.providers.HttpProvider('http://localhost:8545');
// EcommerceStore.setProvider(provider);

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tcr');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App define
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

Object.keys(controllers).forEach((key) => {
  app.use('/api', controllers[key])
})

app.listen(3000, () => {
  console.log('Server start at port 3000');
});
