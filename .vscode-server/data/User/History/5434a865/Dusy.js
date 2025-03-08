import { ethers } from "hardhat";
import { expect } from "chai";
describe("simple storage contract", function() {
    beforeEach(async function () {
        SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        [owner] = await ethers.getSigners();
        simpleStorage = await SimpleStorage.deploy();
        console.log("SimpleStorage contract deployed to:", simpleStorage.address);
    });

    it("should have a default value of 0", async function () {
        const value = await simpleStorage.retrieve();
        expect(value).to.equal(0);
    });
});


let SimpleStorage;
let simpleStorage;
let owner;

describe("simple storage contract", function() {
  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    [owner] = await ethers.getSigners();
    simpleStorage = await SimpleStorage.deploy();
    console.log("SimpleStorage contract deployed to:", simpleStorage.address);
  });

  it("should have a default value of 0", async function () {
    const value = await simpleStorage.retrieve();
    expect(value).to.equal(0);
  });
});
