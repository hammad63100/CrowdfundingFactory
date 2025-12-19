const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("CrowdfundingFactory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log("CrowdfundingFactory deployed to:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
