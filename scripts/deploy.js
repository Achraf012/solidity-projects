const { ethers } = require("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();

    console.log("MyContract deployed to:", myContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

