async function main () {

  // Sample erc20
  const name = 'Some Really Cool Token Name'
  const initialSupply = 10000000
  const erc20 = await l2ethers.getContractFactory("ERC20");
  const _erc20 = await erc20.deploy(initialSupply, name);

  console.log("ERC20 deployed to:", _erc20.address);

  // Oracle
  const Oracle = await l2ethers.getContractFactory('Oraclize')

  const oracle = await Oracle.deploy({
    signer: (await ethers.getSigners())[0]
  });

  console.log("oracle connector deployed to:", oracle.address);

  // Address Resolver
  const Oracle_ADR = await l2ethers.getContractFactory('OraclizeAddrResolver')

  const oracle_adr = await Oracle_ADR.deploy();

  console.log("oracle address resolver deployed to:", oracle_adr.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
