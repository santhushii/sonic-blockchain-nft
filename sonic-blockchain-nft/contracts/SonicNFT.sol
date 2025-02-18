// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SonicERC1155 is ERC1155URIStorage, Ownable {
    uint256 public constant ARTWORK = 1;  // NFT ID Example
    uint256 public constant MUSIC = 2;    // Another NFT ID Example

    mapping(uint256 => uint256) public totalSupply;  // Track NFT supply

    constructor() ERC1155("ipfs://QmYourMetadataBaseURI/{id}.json") Ownable(msg.sender) {}

    // Mint Single NFT (With Gas Optimization)
    function mint(address to, uint256 tokenId, uint256 amount, string memory tokenURI) public onlyOwner {
        _mint(to, tokenId, amount, "");
        _setURI(tokenId, tokenURI);
        totalSupply[tokenId] += amount;
    }

    // Mint Batch NFTs
    function mintBatch(address to, uint256[] memory tokenIds, uint256[] memory amounts, string[] memory tokenURIs) public onlyOwner {
        _mintBatch(to, tokenIds, amounts, "");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _setURI(tokenIds[i], tokenURIs[i]);
            totalSupply[tokenIds[i]] += amounts[i];
        }
    }

    // Check NFT Balance
    function balanceOfToken(address account, uint256 tokenId) public view returns (uint256) {
        return balanceOf(account, tokenId);
    }
}
