
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4700000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider("https://ropsten.infura.io/eqWL8Q6R8MZLGS1XF0z5")
      },
      network_id: "3"
    },
    main: {
      provider: function() {
        return new HDWalletProvider( "https://ropsten.infura.io/eqWL8Q6R8MZLGS1XF0z5 ")
      },
      network_id: "1"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};