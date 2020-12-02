const FeverContract = artifacts.require("FeverContract");

module.exports = function (deployer) {
  deployer.deploy(FeverContract);
};
