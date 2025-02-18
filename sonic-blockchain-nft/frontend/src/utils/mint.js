import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicNFT.sol/SonicNFT.json";

const contractAddress = "0xFB45499bC31783d7F6A068eb5400714881bC1de0"; // Your deployed contract

export const mintNFT = async (tokenURI) => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, signer);

    try {
        const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
        await tx.wait();
        alert("NFT Minted Successfully!");
    } catch (error) {
        console.error("Minting failed", error);
        alert("Minting failed!");
    }
};
