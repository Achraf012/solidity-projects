const { expect } = require("chai");

describe("simpleNFT", function () {
    let SimpleNFT, simpleNFT, owner, addr1, addr2;

    beforeEach(async function () {
        SimpleNFT = await ethers.getContractFactory("simpleNFT");
        simpleNFT = await SimpleNFT.deploy();
        await simpleNFT.wait

        [owner, addr1, addr2] = await ethers.getSigners();
    });

    it("Should mint an NFT and assign the correct owner", async function () {
        await simpleNFT.mint("ipfs://tokenURI1");
        expect(await simpleNFT.ownerOf(0)).to.equal(owner.address);
    });

    it("Should approve an address for a token", async function () {
        await simpleNFT.mint("ipfs://tokenURI2");

        await simpleNFT.approve(addr1.address, 0);
        expect(await simpleNFT.getApprovedAccounts(0)).to.equal(addr1.address);
    });

    it("Should transfer an NFT from owner to another address", async function () {
        await simpleNFT.mint("ipfs://tokenURI3");

        await simpleNFT.transferNFT(addr1.address, 0);
        expect(await simpleNFT.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should transfer an NFT by an approved address", async function () {
        await simpleNFT.mint("ipfs://tokenURI4");

        await simpleNFT.approve(addr1.address, 0);
        await simpleNFT.connect(addr1).transferNFT(addr2.address, 0);
        expect(await simpleNFT.ownerOf(0)).to.equal(addr2.address);
    });

    it("Should retrieve the correct token URI", async function () {
        await simpleNFT.mint("ipfs://tokenURI5");
        expect(await simpleNFT.tokenURI(0)).to.equal("ipfs://tokenURI5");
    });

    it("Should fail transfer if not owner or approved", async function () {
        await simpleNFT.mint("ipfs://tokenURI6");

        await expect(
            simpleNFT.connect(addr1).transferNFT(addr2.address, 0)
        ).to.be.revertedWith("Not owner or approved");
    });

    it("Should not approve zero address", async function () {
        await simpleNFT.mint("ipfs://tokenURI7");

        await expect(
            simpleNFT.approve("0x0000000000000000000000000000000000000000", 0)
        ).to.be.revertedWith("Invalid address");
    });

    it("Should not transfer to zero address", async function () {
        await simpleNFT.mint("ipfs://tokenURI8");

        await expect(
            simpleNFT.transferNFT("0x0000000000000000000000000000000000000000", 0)
        ).to.be.revertedWith("transfer failed ,0 address");
    });
});
