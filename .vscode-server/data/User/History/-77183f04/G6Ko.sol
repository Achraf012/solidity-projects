// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count++;
    }

    function decrement() public {
        require(count > 0, "Counter can't be negative");
        count--;
    }
}
