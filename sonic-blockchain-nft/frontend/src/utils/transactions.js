import { ethers } from "ethers";
import nftABI from "../artifacts/contracts/SonicERC1155.sol/SonicERC1155.json";
import { contractAddress } from "./contract";

export const fetchTransactions = async () => {
    if (!window.ethereum) {
        alert("MetaMask not detected!");
        return [];
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, nftABI.abi, provider);

    try {
        const transferEvents = await contract.queryFilter("TransferSingle");
        return transferEvents.map(event => ({
            from: event.args.from,
            to: event.args.to,
            tokenId: event.args.id.toString(),
            amount: event.args.value.toString()
        }));
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};
