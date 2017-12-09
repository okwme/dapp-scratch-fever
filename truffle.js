
var HDWalletProvider = require("truffle-hdwallet-provider");
var secrets = require('./secret.js')
console.log(secrets)
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
        return new HDWalletProvider(secrets.mnemonic, "https://rinkeby.infura.io/" + secrets.infura)
      },
      network_id: 3
    } 
  },  
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
