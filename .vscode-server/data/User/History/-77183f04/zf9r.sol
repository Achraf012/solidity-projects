// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract exo {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _newOwner) public {
        owner = _newOwner;
    }
}
