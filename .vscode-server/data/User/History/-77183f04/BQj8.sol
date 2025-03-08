// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Subtraction {
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        require(a >= b, "Result cannot be negative");
        return a - b;
    }
}
