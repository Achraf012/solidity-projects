const { expect } = require("chai");
const { ethers } = require("hardhat");

let SimpleStorage;
let simpleStorage;
let owner;
describe("simple storage contract",function(){
    beforeEach(async function () {
        SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        owner = await ethers.getSigners();
        simpleStorage = await SimpleStorage.deploy();
        
    });

  it("")
})