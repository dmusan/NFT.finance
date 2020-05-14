var LendNFT = artifacts.require("../contracts/LendNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(LendNFT);
};
