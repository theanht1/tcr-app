# Token-Curated Registry with offchain server

## Initialize and running
* Install truffle, ganache
```
npm install -g truffle
npm install -g ganache
```

* Start ganache in a terminal
```
ganache-cli -p 8545 -i 420
```

* Copy ganache's mnemonic to secret file
```
echo '{
  "mnemonic": "{MNEMONIC_PHRASE}"
}' > secrets.json
```

* Migrate contracts
```
truffle migrate --reset --compile-all --network ganache
```

* Start server in a terminal
```
npm run server
```

* Configure and run tcr-ui
```
cd tcr-ui

# Edit `registryAddress` and `serverAddress` in `src/confg/config.json`
# `serverAddress` is the account to migrate contract (i.e ganache accounts)

npm i
npm run start
```
