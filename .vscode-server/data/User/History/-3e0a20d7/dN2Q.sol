// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard, Ownable(msg.sender) {
    address public escrowAgent;
    address private buyer;
    address payable private seller;
    uint256 private amount;
    bool sent;

    constructor(address _buyer, address payable _seller) {
        // Ownable sets msg.sender as owner
        escrowAgent = msg.sender; // The deployer is the initial escrow agent
        buyer = _buyer;
        seller = _seller;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can do this");
        _;
    }

    event Deposited(address indexed buyer, uint256 amount);
    event Released(address indexed seller, uint256 amount);
    event Refunded(address indexed buyer, uint256 amount);

    function deposit() external payable onlyBuyer nonReentrant {
        require(msg.value > 0, "Must send ETH to deposit");
        require(!sent, "Funds already deposited");

        amount = msg.value;
        sent = true;
        emit Deposited(msg.sender, msg.value);
    }

    function releaseFunds() external nonReentrant onlyOwner {
        require(seller != address(0), "Invalid seller address");
        require(sent, "No money to release");

        uint256 releasedAmount = amount;
        sent = false;
        amount = 0;

        (bool success, ) = seller.call{value: releasedAmount}("");
        require(success, "Transfer failed");

        emit Released(seller, releasedAmount);
    }

    function refund() external nonReentrant onlyOwner {
        require(sent, "No money to refund");

        uint256 refundedAmount = amount;
        sent = false;
        amount = 0;

        (bool success, ) = buyer.call{value: refundedAmount}("");
        require(success, "Refund failed");

        emit Refunded(buyer, refundedAmount);
    }

    // Allows the owner to update the escrow agent
    function changeEscrowAgent(address newAgent) external onlyOwner {
        require(newAgent != address(0), "Invalid address");
        escrowAgent = newAgent;
    }

    // Allows the owner to withdraw accidental ETH sent to contract
    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");

        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed");
    }
}
