// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;

    // Store the value
    function store(uint256 value) public {
        storedValue = value;
    }

    // Retrieve the value
    function retrieve() public view returns (uint256) {
        return storedValue;
    }
}
