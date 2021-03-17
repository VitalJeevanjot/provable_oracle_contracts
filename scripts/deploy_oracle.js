// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main () {
  // const ethers = hre.ethers
  // const l2ethers = hre.l2ethers


  // console.log('network:', await ethers.provider.getNetwork())

  // const signer = (await ethers.getSigners())[0]
  // console.log('signer:', await signer.getAddress())

  // const Greeter = await l2ethers.getContractFactory('Greeter', {
  //   signer: (await ethers.getSigners())[0]
  // })

  // const greeter = await Greeter.deploy('Hello, world!')
  // await greeter.deployed()

  // console.log('Greeter deployed to:', greeter.address)
  // console.log(
  //   'deployed bytecode:',
  //   await ethers.provider.getCode(greeter.address)
  // )
  // console.log('greeting:', await greeter.greet())
  // // Hardhat always runs the compile task when running scripts with its command
  // // line interface.
  // //
  // // If this script is run directly using `node` you may want to call compile 
  // // manually to make sure everything is compiled
  // // await hre.run('compile');

  // // We get the contract to deploy
  const OraclizeAddrResolver = await hre.ethers.getContractFactory("OraclizeAddrResolver");
  const oraclizeAddrResolver = await OraclizeAddrResolver.deploy();
  console.log("oraclizeAddrResolver deployed to:", oraclizeAddrResolver.address);

  const Oracle = await hre.ethers.getContractFactory("Oraclize");
  const oracle = await Oracle.deploy();
  console.log("oracle connector deployed to:", oracle.address);


  // setTimeout(async function () {
  //   await hre.run("verify:verify", {
  //     address: oraclizeAddrResolver.address
  //   })
  //   await hre.run("verify:verify", {
  //     address: oracle.address
  //   })
  //   await oraclizeAddrResolver.setAddr(oracle.address)
  // }, 15000);

  // setTimeout(async function () {
  //   await oracle.addCbAddress("0x7762c9dD7380d715FF10F90b2F7fb9c64FB1C670", 0x10)
  // }, 35000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
