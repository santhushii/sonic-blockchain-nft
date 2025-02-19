import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol/SonicERC1155.json";
import { contractAddress } from "./contract";

export const mintNFT = async (to, amount, tokenURI) => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, signer);

    try {
        const tx = await contract.mint(to, amount, tokenURI);
        await tx.wait();
        alert("NFT Minted Successfully!");
    } catch (error) {
        console.error("Minting Failed:", error);
        alert("Transaction Failed!");
    }
};
