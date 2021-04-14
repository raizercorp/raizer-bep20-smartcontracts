require('dotenv').config();

var HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    tbsc: {
      networkCheckTimeout: 100000,
      provider: function() {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          process.env.BLOCKCHAIN_NODE_RPC_URL
        );
      },
      network_id: 97,
      gas: 8000000
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  db: {
    enabled: false
  }
};
