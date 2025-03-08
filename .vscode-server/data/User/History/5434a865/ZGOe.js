import { expect } from "chai";
import { ethers }  from "hardhat";

let SimpleStorage;
let simpleStorage;
let owner;
describe("simple storage contract",function(){
    beforeEach(async function () {
        SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        owner = await ethers.getSigners();
        simpleStorage = await SimpleStorage.deploy();
        
    });

  it("should have a default value of 0",async function () {
    const value = await SimpleStorage.retrieve();
    expect(value).to.equal(0);
    
  })
})