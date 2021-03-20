const hre = require("hardhat");
async function main () {
  const [owner] = await hre.ethers.getSigners();
  const updatePriceContract = await hre.ethers.getContractFactory("APIConsumer");
  // Moonbeam
  const _updatePriceContract = updatePriceContract.attach("0x18794d1F786a1Db70C7a83c8201b457b3629C914")
  // Kovan
  // const _updatePriceContract = updatePriceContract.attach("0x5F7a0f4f77aCAcdAe2D5263FdA00482b505F3AfC")
  // BSC testnet
  // const _updatePriceContract = updatePriceContract.attach("0x9D7D1C7C7ffD440f57dE9d6BBD9eBbB05a97D401")
  // console.log(_updatePriceContract)

  const tx_setAddress = await _updatePriceContract.updatePrice(await fetch_overrides())
  await tx_setAddress.wait()
  console.log(tx_setAddress)

  console.log("----------------------------")
  const gotPrice = await _updatePriceContract.price()
  console.log("Got price: " + gotPrice)
  const gasPrice = await _updatePriceContract.gasPrice()
  console.log("Gas price: " + gasPrice.toString())
  const current_balance = await _updatePriceContract.current_balance()
  console.log("Current Balance: " + current_balance.toString())
  const gas_limit_block = await _updatePriceContract.gas_limit_block()
  console.log("Block GAS limit :" + gas_limit_block.toString())
  const proof = await _updatePriceContract.current_proof()
  console.log("\n\nProof :" + current_proof.toString())
  console.log("----------------------------")


}

async function fetch_overrides () {
  let curr_gas = await hre.ethers.provider.getGasPrice()
  console.log("Current gas: " + curr_gas.toString())
  return {
    gasPrice: curr_gas,
    value: { _hex: '0x0e35fa931a0001', _isBigNumber: true }
  };
}
main()