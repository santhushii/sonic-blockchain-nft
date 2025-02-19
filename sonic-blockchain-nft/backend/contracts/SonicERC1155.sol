// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SonicERC1155 is ERC1155URIStorage, Ownable {
    uint256 private _nextTokenId = 1; // Start token IDs from 1

    constructor() ERC1155("ipfs://bafkreihblby3crbfdvyk7dgejhxyg5rlrazeoj25y2lcxdc6vnnd3kgiti/{id}.json") Ownable(msg.sender) {}

    function mint(address to, uint256 amount, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _mint(to, tokenId, amount, "");
        _setURI(tokenId, tokenURI);
        _nextTokenId++;
        return tokenId;
    }

    function mintBatch(address to, uint256[] memory tokenIds, uint256[] memory amounts, string[] memory uris) public onlyOwner {
        _mintBatch(to, tokenIds, amounts, "");
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _setURI(tokenIds[i], uris[i]);
        }
    }
}
