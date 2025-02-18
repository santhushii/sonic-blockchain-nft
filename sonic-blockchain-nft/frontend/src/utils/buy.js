import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicNFT.sol/SonicNFT.json";

const contractAddress = "0xFB45499bC31783d7F6A068eb5400714881bC1de0"; // Your contract address

export const buyNFT = async (tokenId, price) => {
    if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, nftABI.abi, signer);

    try {
        const tx = await contract.buyNFT(tokenId, { value: ethers.parseEther(price) });
        await tx.wait();
        alert("NFT Purchased Successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Buying failed", error);
        alert("Transaction failed!");
    }
};
