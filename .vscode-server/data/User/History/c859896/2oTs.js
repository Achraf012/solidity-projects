const { expect } = require("chai");

describe("simpleNFT", function () {
    let SimpleNFT, simpleNFT, owner, addr1, addr2;

    beforeEach(async function () {
        SimpleNFT = await ethers.getContractFactory("simpleNFT");
        simpleNFT = await SimpleNFT.deploy();
        await simpleNFT.deployed();

        [owner, addr1, addr2] = await ethers.getSigners();
    });

    it("Should mint an NFT and assign the correct owner", async function () {
        await simpleNFT.mint("ipfs://tokenURI1");
        expect(await simpleNFT.ownerOf(0)).to.equal(owner.address);
    });

    it("Should approve an address for a token", async function () {
        await simpleNFT.mint("ipfs://tokenURI2");

        await simpleNFT.approve(addr
