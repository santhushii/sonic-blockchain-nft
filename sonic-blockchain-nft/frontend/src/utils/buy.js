import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol/SonicERC1155.json";
import { contractAddress } from "./contract";

export const buyNFT = async (tokenId, price) => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, signer);

    try {
        const tx = await contract.buyNFT(tokenId, { value: ethers.parseEther(price) });
        await tx.wait();
        alert("NFT Purchased Successfully!");
    } catch (error) {
        console.error("Buying Failed:", error);
        alert("Transaction Failed!");
    }
};
