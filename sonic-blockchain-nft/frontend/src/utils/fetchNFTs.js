import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol/SonicERC1155.json";

const contractAddress = "0x904B940C2a6462A22F26bb5b23FcfFdb5Beafd2e"; // Your ERC-1155 contract

// Fetch NFTs Owned by User
export const fetchNFTs = async () => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return [];
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, provider);

    try {
        const tokenIds = [1, 2]; // Add more token IDs if needed
        let ownedNFTs = [];

        for (let tokenId of tokenIds) {
            const balance = await contract.balanceOf(signer.getAddress(), tokenId);
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
