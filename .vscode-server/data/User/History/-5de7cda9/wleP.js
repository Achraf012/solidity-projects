

describe("Escrow Contract", function () {
    let Escrow, escrow;
    let owner, buyer, seller, escrowAgent;

    beforeEach(async function () {
        [owner, buyer, seller] = await ethers.getSigners();
        Escrow = await ethers.getContractFactory("Escrow");
        escrow = await Escrow.deploy(buyer.address, seller.address);
        await escrow.waitForDeployment();
    });

    it("Should deploy correctly", async function () {
        expect(await escrow.escrowAgent()).to.equal(owner.address);
    });

    it("Should allow buyer to deposit funds", async function () {
        const depositAmount = ethers.parseEther("1");
        await escrow.connect(buyer).deposit({ value: depositAmount });

        expect(await ethers.provider.getBalance(escrow.target)).to.equal(depositAmount);
    });

    it("Should allow owner to release funds to seller", async function () {
        const depositAmount = ethers.parseEther("1");
        await escrow.connect(buyer).deposit({ value: depositAmount });

        await escrow.connect(owner).releaseFunds();

        expect(await ethers.provider.getBalance(escrow.target)).to.equal(0);
    });

    it("Should allow owner to refund buyer", async function () {
        const depositAmount = ethers.parseEther("1");
        await escrow.connect(buyer).deposit({ value: depositAmount });

        await escrow.connect(owner).refund();

        expect(await ethers.provider.getBalance(escrow.target)).to.equal(0);
    });

    it("Should allow owner to change escrow agent", async function () {
        await escrow.connect(owner).changeEscrowAgent(buyer.address);
        expect(await escrow.escrowAgent()).to.equal(buyer.address);
    });

    it("Should allow owner to withdraw funds from contract", async function () {
        const depositAmount = ethers.parseEther("1");
        await escrow.connect(buyer).deposit({ value: depositAmount });

        await escrow.connect(owner).withdraw();

        expect(await ethers.provider.getBalance(escrow.target)).to.equal(0);
    });
});

