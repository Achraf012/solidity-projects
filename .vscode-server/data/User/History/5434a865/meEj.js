const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage contract", function () {
  let SimpleStorage;
  let simpleStorage;
  let owner;

  beforeEach(async function () {
    // Get the contract factory for SimpleStorage
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    // Get signers and take the first one as the owner
    [owner] = await ethers.getSigners();
    // Deploy the contract and wait for it to be deployed
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
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
