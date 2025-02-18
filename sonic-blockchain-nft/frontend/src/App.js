import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { fetchNFTs } from "./utils/getNFTs";
import NFTGallery from "./components/NFTGallery";

function App() {
    const [account, setAccount] = useState(null);
    const [nfts, setNfts] = useState([]);

    // Connect MetaMask Wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                setAccount(await signer.getAddress());

                // Load NFTs after connecting
                loadNFTs();
            } catch (error) {
                console.error("Wallet connection failed:", error);
            }
        } else {
            alert("MetaMask not detected!");
        }
    };

    // Load NFTs from Blockchain
    const loadNFTs = async () => {
        const items = await fetchNFTs();
        setNfts(items);
    };

    useEffect(() => {
        if (account) loadNFTs();
    }, [account]);

    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
            <h1>Sonic ERC-1155 NFT Collection</h1>

            {/* Wallet Connection */}
            <button 
                onClick={connectWallet} 
                style={{ padding: "10px 20px", fontSize: "16px", margin: "10px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </button>

            {/* Display User's NFT Collection */}
            <h2>My NFT Collection</h2>
            <NFTGallery nfts={nfts} />
        </div>
    );
}

export default App;
