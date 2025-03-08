// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract simpleNFT {
    uint256 public tokenCounter;
    mapping(uint => address) public approved;
    mapping(uint => address) private Owners;
    mapping(uint => string) private tokenURIs;
    event Minted(address owner, uint tokenID);
    event transfered(address sender, address receiver, uint tokenID);

    constructor() {
        tokenCounter = 0;
    }

    function mint(string memory _tokenURI) external {
        uint newtokenID = tokenCounter;
        tokenCounter++;
        Owners[newtokenID] = msg.sender;
        tokenURIs[newtokenID] = _tokenURI;
        emit Minted(msg.sender, newtokenID);
    }

    function approve(address to, uint256 tokenID) external {
        require(Owners[tokenID] == msg.sender, "Not the owner"); // Only owner can approve
        require(to != address(0), "Invalid address"); // Prevent approving zero address

        approved[tokenID] = to; // Store approval
    }

    function getApprovedAccounts(uint nftID) external view returns (address) {
        return approved[nftID];
    }

    function transferNFT(address to, uint tokenID) external {
        address owner = Owners[tokenID];
        require(to!=address(0),)
        require(
            owner == msg.sender || approved[tokenID] == msg.sender,
            "Not owner or approved"
        );
        Owners[tokenID] = to;
        approved[tokenID] = address(0);
    }

    function ownerOf(uint tokenID) external view returns (address) {
        return Owners[tokenID];
    }

    function tokenURI(uint tokenID) external view returns (string memory) {
        return tokenURIs[tokenID];
    }
}
