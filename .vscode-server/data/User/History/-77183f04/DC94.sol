// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract simpleNFT {
    uint256 public tokenCounter;
    mapping(uint => address) private acounts;
    mapping(uint => string) private tokenURIs;
    event Minted(address owner, uint tokenID);
    event transfered(address sender, address receiver, uint tokenID);

    constructor() {
        tokenCounter = 0;
    }

    function mint(string memory _tokenURI) external {
        uint newtokenID = tokenCounter;
        tokenCounter++;
        acounts[newtokenID] = msg.sender;
        tokenURIs[newtokenID] = _tokenURI;
        emit Minted(msg.sender, newtokenID);
    }

    function transferNFT(address to, uint tokenID) external {
        require(
            acounts[tokenID] == msg.sender && to != address(0),
            "transfer failed"
        );
        acounts[tokenID] = to;
        emit transfered(msg.sender, to, tokenID);
    }

    function ownerOf(uint tokenID) external view returns (address) {
        return acounts[tokenID];
    }

    function tokenURI(uint tokenID) external view returns (string memory) {
        return tokenURIs[tokenID];
    }
}
