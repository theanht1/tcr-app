const express = require('express');
const { web3, applyRegistry } = require('../utils');

const applyController = express.Router();

applyController.post('/apply', async ({
  body: { name },
}, res) => {
  res.status(201).json(await applyRegistry({ name }));
});

module.exports = applyController;
