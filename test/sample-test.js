// import { l2ethers } from "hardhat"

describe("My Contract Test", () => {
  it("should deploy a contract", async () => {
    const factory = await l2ethers.getContractFactory("Oraclize")
    const instance = await factory.deploy()
    // Now we're cooking with gas!
  })
})
