import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol/SonicERC1155.json";
import { contractAddress } from "./contract";

export const transferNFT = async (from, to, tokenId, amount) => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, signer);

    try {
        const tx = await contract.safeTransferFrom(from, to, tokenId, amount, "0x");
        await tx.wait();
        alert("NFT Transferred Successfully!");
    } catch (error) {
        console.error("Transfer Failed:", error);
        alert("Transaction Failed!");
    }
};
