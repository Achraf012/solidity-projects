// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyNFT {
    uint public TokenCounter;
    mapping(uint => address) public approved;
    mapping(uint => address) private Owners;
    mapping(uint => string) private TokenURIs;
    event minted(string tokenURI, uint tokenID);

    constructor() {
        TokenCounter = 0;
    }

    function Mint(string memory _TokenURI) public returns (uint) {
        uint newTokenID = TokenCounter;
        TokenCounter++;
        Owners[newTokenID] = msg.sender;
        TokenURIs[newTokenID] = _TokenURI;
        emit minted(_TokenURI, newTokenID);
        return newTokenID;
    }

    function approve(address to, uint tokenID) external {
        approved[tokenID] = to;
    }

    function transferNFT(address to, uint tokenID) external {
        address owner = Owners[tokenID];
        require(
            owner == msg.sender || approved[tokenID] == msg.sender,
            "Not owner or approved"
        );
        Owners[tokenID] = to;
        approved[tokenID] = address(0);
    }

    function OwnerOf(uint TokenID) public view returns (address) {
        return Owners[TokenID];
    }

    function TokenURI(uint TokenID) public view returns (string memory) {
        return TokenURIs[TokenID];
    }
}
