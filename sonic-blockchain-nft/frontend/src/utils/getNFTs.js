import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol";

// Manually add the contract address
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Update with your deployed contract

export const fetchNFTs = async (walletAddress) => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return [];
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, nftABI.abi, provider);

    try {
        const tokenIds = [1, 2, 3]; // Adjust based on your minted NFTs
        let ownedNFTs = [];

        for (let tokenId of tokenIds) {
            const balance = await contract.balanceOf(walletAddress, tokenId);
            if (balance > 0) {
                const tokenURI = await contract.uri(tokenId);
                ownedNFTs.push({ id: tokenId, image: tokenURI, amount: balance.toString() });
            }
        }

        return ownedNFTs;
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        return [];
    }
};
