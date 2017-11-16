module.exports = {
  networks: {
     development: {
      network_id: "default"
      // host: "localhost",
      // port: 9545,
      // network_id: '*',
      // // from: '0xa1d98ad82ed22edd77bb7a4190182047b26273b8',
      // gas: 7000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
