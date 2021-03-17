import { HardhatUserConfig } from 'hardhat/types'
import "@nomiclabs/hardhat-waffle";

// import '@eth-optimism/plugins/hardhat/compiler';
// import '@eth-optimism/plugins/hardhat/ethers';

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

import "@nomiclabs/hardhat-etherscan";

import 'dotenv/config'


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  networks: {
    optimism: {
      chainId: 69,
      url: "https://kovan.optimism.io/",
      accounts: ["0xeb9666fa13d4af31414f310a26e9c679c3a762f4eea159e9eea715add926bd8c"],
      blockGasLimit: 9000000,
      gasPrice: "auto",
    },
    local: {
      chainId: 69,
      url: "https://localhost:8545/",
      accounts: ["0xeb9666fa13d4af31414f310a26e9c679c3a762f4eea159e9eea715add926bd8c"],
      blockGasLimit: 9000000,
      gasPrice: "auto",
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY]
    },
    moonbeam_testnet: {
      url: "https://rpc.testnet.moonbeam.network",
      chainId: 1287,
      accounts: [process.env.PRIVATE_KEY]
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
  solidity: "0.7.3"
};

export default config
