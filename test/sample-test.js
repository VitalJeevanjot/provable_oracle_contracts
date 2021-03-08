// import { l2ethers } from "hardhat"

describe("My Contract Test", () => {
  it("should deploy a contract", async () => {
    const Oracle = await l2ethers.getContractFactory("Oraclize")
    const oracle = await Oracle.deploy()
    // Now we're cooking with gas!
  })
})
