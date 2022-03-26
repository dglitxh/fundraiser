const FundraiserFactoryContract = artifacts.require("Factory");

module.exports = function(deployer){
    deployer.deploy(FundraiserFactoryContract)
}