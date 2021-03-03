// import { l2ethers } from 'hardhat'

async function main () {
  // We get the contract to deploy

  const name = 'Some Really Cool Token Name'
  const initialSupply = 10000000


  const erc20 = await l2ethers.getContractFactory("ERC20");
  const _erc20 = await erc20.deploy(initialSupply, name);

  console.log("ERC20 deployed to:", _erc20.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });