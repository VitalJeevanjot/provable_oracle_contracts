// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
var fs = require('fs');


var obj = JSON.parse(fs.readFileSync('scripts/connector_abi.json', 'utf8'));
async function main () {

  const [owner] = await hre.ethers.getSigners();

  // // We get the contract to deploy
  const OraclizeAddrResolver = await hre.ethers.getContractFactory("OraclizeAddrResolver");
  const oraclizeAddrResolver = await OraclizeAddrResolver.attach("0x54bd25ca77f9b1c837ce9ecAd616B1409169FD82");

  const Oracle = await hre.ethers.getContractFactory("Oraclize");
  var oracle = await Oracle.deploy();
  oracle = new hre.ethers.Contract(oracle.address, ["function addCbAddress(address, bytes1)"], owner);
  console.log("oracle connector deployed to:", oracle.address);

  const oracle_addr = await oraclizeAddrResolver.setAddr(oracle.address)
  await oracle_addr.wait()
  const _oracle_addr = await oraclizeAddrResolver.addr()
  console.log(_oracle_addr)

  const tx_add_cb = await oracle.addCbAddress("0x7762c9dD7380d715FF10F90b2F7fb9c64FB1C670", 0x10)
  await tx_add_cb.wait()
  const oracle_2 = new hre.ethers.Contract(oracle.address, obj, owner);

  console.log("----------------------------")
  const getCbAddress = await oracle_2.cbAddresses("0x7762c9dD7380d715FF10F90b2F7fb9c64FB1C670")
  console.log("CB Address:" + getCbAddress)
  console.log("----------------------------")


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
