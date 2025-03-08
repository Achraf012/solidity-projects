import pkg from 'hardhat';
const { ethers } = pkg;
import { expect } from "chai";

describe("SimpleStorage contract", function () {
  let SimpleStorage;
  let simpleStorage;
  let owner;

  beforeEach(async function () {
    // Get the contract factory and deploy the contract
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    [owner] = await ethers.getSigners();  // Get the first account as the owner
    simpleStorage = await SimpleStorage.deploy();
    console.log("SimpleStorage contract deployed to:", simpleStorage.address);
  });

  it("should have a default value of 0", async function () {
    const value = await simpleStorage.retrieve();
    expect(value).to.equal(0);
  });

  it("should store a value correctly", async function () {
    const newValue = 42;
    await simpleStorage.store(newValue);
    const value = await simpleStorage.retrieve();
    expect(value).to.equal(newValue);
  });
});
