import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@eth-optimism/plugins/hardhat/compiler'
import "@nomiclabs/hardhat-etherscan";

import 'dotenv/config'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

export default {
  defaultNetwork: "hardhat",
  networks: {
    optimism: {
      url: process.env.L2_NODE_URL || "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 0,
      gas: 0
    },
    kovan: {
      url: "https://kovan.infura.io/v3/5299495f325e4eee96df12d5edeaf850",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: "0.5.16",
  ovm: {
    solcVersion: '0.5.16' // Your version goes here.
  }
};
