// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main () {
  const ethers = hre.ethers
  const l2ethers = hre.l2ethers


  console.log('network:', await ethers.provider.getNetwork())

  const signer = (await ethers.getSigners())[0]
  console.log('signer:', await signer.getAddress())

  const Greeter = await l2ethers.getContractFactory('Greeter', {
    signer: (await ethers.getSigners())[0]
  })

  const greeter = await Greeter.deploy('Hello, world!')
  await greeter.deployed()

  console.log('Greeter deployed to:', greeter.address)
  console.log(
    'deployed bytecode:',
    await ethers.provider.getCode(greeter.address)
  )
  console.log('greeting:', await greeter.greet())
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
