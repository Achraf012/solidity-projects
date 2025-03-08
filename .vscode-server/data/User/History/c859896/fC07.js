import { expect } from "chai";
import { ethers } from "hardhat";
describe("my NFT", function () {
    let Contract, contract, owner, addr1, addr2;
    beforeEach(async function () {
        Contract = await ethers.getContractFactory('my nft');
        [owner, addr1, addr2] = await ethers.getSigners();

    })
})