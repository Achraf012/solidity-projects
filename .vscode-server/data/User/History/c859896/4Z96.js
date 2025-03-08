const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Approval and Transfer Tests", function () {
    let Contract, contract, owner, approvedUser, anotherUser;

    beforeEach(async function () {
        // Deploy the contract
        Contract = await ethers.getContractFactory("simpleNFT");
        [owner, approvedUser, anotherUser] = await ethers.getSigners();

        contract = await Contract.deploy();
        await contract.waitForDeployment();

        // Mint an NFT (Assuming mint function exists)
        await contract.connect(owner).mint("tokenURI_1");
    });

    it("Owner should be able to approve another user", async function () {
        await expect(contract.connect(owner).approve(approvedUser.address, 0))
            .to.emit(contract, "Approval")
            .withArgs(owner.address, approvedUser.address, 0);

        expect(await contract.approved(0)).to.equal(approvedUser.address);
    });

    it("Only owner can approve someone", async function () {
        await expect(contract.connect(approvedUser).approve(anotherUser.address, 0))
            .to.be.revertedWith("Not the owner");
    });

    it("Approved user should be able to transfer NFT", async function () {
        await contract.connect(owner).approve(approvedUser.address, 0);

        await contract.connect(approvedUser).transferNFT(anotherUser.address, 0);

        expect(await contract.Owners(0)).to.equal(anotherUser.address);
    });

    it("Owner can still transfer NFT without approval", async function () {
        await contract.connect(owner).transferNFT(anotherUser.address, 0);

        expect(await contract.Owners(0)).to.equal(anotherUser.address);
    });

    it("Approval should reset after transfer", async function () {
        await contract.connect(owner).approve(approvedUser.address, 0);
        await contract.connect(approvedUser).transferNFT(anotherUser.address, 0);

        expect(await contract.approved(0)).to.equal(ethers.ZeroAddress);
    });

    it("Non-approved users cannot transfer NFT", async function () {
        await expect(contract.connect(anotherUser).transferNFT(approvedUser.address, 0))
            .to.be.revertedWith("Not owner or approved");
    });

    it("Cannot approve address(0)", async function () {
        await expect(contract.connect(owner).approve(ethers.ZeroAddress, 0))
            .to.be.revertedWith("Invalid address");
    });

    it("Cannot transfer to address(0)", async function () {
        await expect(contract.connect(owner).transferNFT(ethers.ZeroAddress, 0))
            .to.be.revertedWith("Invalid recipient address");
    });
});
