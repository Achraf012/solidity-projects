// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract exo {
    mapping(address => uint) public acounts;

    function deposit() external payable {
        acounts[msg.sender] += msg.value;
    }

    function withdraw(uint amount) external {
        require(amount <= acounts[msg.sender], "you dont have this amount");

        acounts[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function showBalance() external view returns (uint) {
        return acounts[msg.sender];
    }
}
