const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("simple test for my NFT code", function () {
    let Contract, contract, user1, user2
    beforeEach("simple test", async function () {
        Contract = await ethers.getContractFactory("simpleNFT");
        [user1, user2] = await ethers.getSigners();
        contract = await Contract.deploy();
        await contract.waitForDeployment();
    })
    it("Minting works", async function () {
        await contract.connect(user1).mint("achraf");
        expect(await contract.tokenCounter()).to.equal(1);
        expect(await contract.ownerOf(0)).to.equal(user1.address);
    })
    it("transfer works", async function () {
        await contract.connect(user1).mint("achraf");
        await contract.connect(user1).transferNFT(user2, 0);
        expect(await contract.ownerOf(0)).to.equal(user2.address);
    })
    it(" the correct tokenURI is stored.", async function () {
        await contract.connect(user1).mint("achraf");
        expect(await contract.tokenURI(0)).to.equal("achraf")
    })
    it(" the correct owner is assigned.", async function () {
        await contract.connect(user1).mint("achraf");
        expect(await contract.ownerOf(0)).to.equal(user1.address)
    })
    it("Ensure the Minted event is emitted.", async function () {

        await expect(contract.connect(user1).mint("achraf")).to.emit(contract, "Minted").withArgs(user1.address, 0);

    })
    it("Ensure the transfered event is emitted.", async function () {
        await contract.connect(user2).mint("achraf");
        await expect(contract.connect(user2).transferNFT(user1, 0)).to.emit(contract, "transfered").withArgs(user2.address, user1.address, 0)
    })
    it("Ensure only the owner can transfer.", async function () {
        await contract.connect(user2).mint("achraf");
        await expect(contract.connect(user1).transferNFT(user1.address, 0)).to.be.revertedWith("transfer failed ")

    })
    // it("Ensure it fails when sending to address(0).", async function () {
    //     const ZERO_ADDRESS = ethers.constants.AddressZero;

    //     await contract.connect(user2).mint("achraf");
    //     await expect(contract.connect(user2).transferNFT(ZERO_ADDRESS, 0)).to.be.revertedWith("transfer failed")

    // })
    it.only("Ensure it fails when sending to address(0).", async function () {
        ZERO_ADDRESS = ethers.ZeroAddress; // ✅ Newer syntax in Hardhat 6+


        // Mint an NFT and get the token ID
        await contract.connect(user2).mint("achraf");
        const tokenId = 0; // First minted token is ID 0

        // Ensure transfer to address(0) fails
        await expect(
            contract.connect(user2).transferNFT(ZERO_ADDRESS, tokenId)
        ).to.be.revertedWith("transfer failed"); // Ensure exact message matches contract
    });
});

