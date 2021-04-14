## BEP20 Smart Contracts

### Setup

To develop smart contracts and tests, you need to install node and npm.

```
$ npm install -g truffle@5.2.1
$ npm install
```

```
$ truffle version

Truffle v5.2.1 (core: 5.2.0)
Solidity v0.5.16 (solc-js)
Node v14.3.0
Web3.js v1.2.9
```

```
$ ganache-cli // To run local blockchain node
$ truffle compile // Compile contract
$ truffle deploy // Deploy contract
$ truffle console // Interate to contract
$ truffle test
```
### Deploy

1. Change env mainnet config
2. `truffle migrate -f 3 --to 3 --network tbsc` # 3 is migration number of VACUS and we wanna deploy to Binance Smart Chain Testnet.
3. Very contract: `truffle-flattener contracts/VACUS.sol > VACUSFull.sol`
4. Copy code from VACUSFull.sol and go to explorer and verify on VerifyContract tab. Choose correct solc version and optimize config

### Contracts

Testnet:
  - RAIZER: https://testnet.bscscan.com/token/0xb1ab7792f573d080328a9bab386efed128ac7613
  - VACUS: https://testnet.bscscan.com/token/0xc74a7e92350aa2120e862567af3f7f8beb4006b9
