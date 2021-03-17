const hre = require("hardhat");
var fs = require('fs');


var obj = JSON.parse(fs.readFileSync('scripts/connector_abi.json', 'utf8'));

// console.log(obj)
async function main () {
  const [owner] = await hre.ethers.getSigners();

  const OraclizeAddrResolver = await hre.ethers.getContractFactory("OraclizeAddrResolver");
  // const Oracle = await hre.ethers.getContractFactory("Oraclize");
  const oracle = new hre.ethers.Contract("0xb14a6FCa0F4Ae4EED8A42fF2d7F322d2EC099D4a", ["function addCbAddress(address, bytes1)"], owner);
  const oracle_2 = new hre.ethers.Contract("0xb14a6FCa0F4Ae4EED8A42fF2d7F322d2EC099D4a", obj, owner);
  const oracle_address_res = await OraclizeAddrResolver.attach("0x54bd25ca77f9b1c837ce9ecAd616B1409169FD82")
  // console.log(oracle)
  const tx_setAddress = await oracle_address_res.setAddr("0xb14a6FCa0F4Ae4EED8A42fF2d7F322d2EC099D4a")
  await tx_setAddress.wait()
  console.log(tx_setAddress)

  console.log("----------------------------")
  const getConnectorAddress = await oracle_address_res.addr()
  console.log(getConnectorAddress)
  console.log("----------------------------")

  const tx_cbAddress = await oracle.addCbAddress("0x7762c9dD7380d715FF10F90b2F7fb9c64FB1C670", 0x10)

  await tx_cbAddress.wait()
  console.log(tx_cbAddress)

  console.log("----------------------------")
  const getCbAddress = await oracle_2.cbAddresses("0x7762c9dD7380d715FF10F90b2F7fb9c64FB1C670")
  console.log(getCbAddress)
  console.log("----------------------------")

}

main()