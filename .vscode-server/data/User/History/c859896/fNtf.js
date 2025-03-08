import { expect } from "chai";
import { ethers } from "hardhat";
let Contract, contract, owner, addr1, addr2;

beforeEach(async function () {
    Contract = await ethers.getContractFactory("MyContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    contract = await Contract.deploy();
    await contract.waitForDeployment();
});
