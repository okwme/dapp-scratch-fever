var FeverContract = artifacts.require("./FeverContract.sol");

module.exports = function(deployer, helper, accounts) {
  return deployer.deploy(FeverContract)
}
