
var HDWalletProvider = require("truffle-hdwallet-provider");
var secrets = require('./secret.js')
module.exports = {
  networks: {
     development: {
      network_id: "default"
      // host: "localhost",
      // port: 9545,
      // network_id: '*',
      // // from: '0xa1d98ad82ed22edd77bb7a4190182047b26273b8',
      // gas: 7000000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, "https://rinkeby.infura.io/" + secrets.infura, 0)
      },
      network_id: 3
    },
    kovan: {
      provider: function() {
        let id = new HDWalletProvider(secrets.mnemonic, "https://kovan.infura.io/" + secrets.infura, 1)
        return id
      },
      network_id: 42,
      gas:4700000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
