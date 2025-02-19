import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { mintNFT } from "./utils/mint";
import { transferNFT } from "./utils/transfer";
import { buyNFT } from "./utils/buy";
import { fetchTransactions } from "./utils/transactions";

function App() {
    const [account, setAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [mintData, setMintData] = useState({ to: "", amount: 1, tokenURI: "" });
    const [transferData, setTransferData] = useState({ to: "", tokenId: "", amount: 1 });
    const [buyData, setBuyData] = useState({ tokenId: "", price: "" });

    useEffect(() => {
        if (account) {
            loadTransactions();
        }
    }, [account]);

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setAccount(await signer.getAddress());
        } else {
            alert("MetaMask not detected!");
        }
    };

    const loadTransactions = async () => {
        const txs = await fetchTransactions();
        setTransactions(txs);
    };

    const handleMint = async () => {
        await mintNFT(mintData.to, mintData.amount, mintData.tokenURI);
        loadTransactions();
    };

    const handleTransfer = async () => {
        await transferNFT(account, transferData.to, transferData.tokenId, transferData.amount);
        loadTransactions();
    };

    const handleBuy = async () => {
        await buyNFT(buyData.tokenId, buyData.price);
        loadTransactions();
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Sonic NFT Marketplace</h1>

            {/* Connect Wallet Button */}
            <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px", margin: "10px" }}>
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </button>

            {/* Mint NFT Section */}
            <div>
                <h2>Mint NFT</h2>
                <input 
                    type="text" 
                    placeholder="Recipient Address" 
                    value={mintData.to} 
                    onChange={(e) => setMintData({ ...mintData, to: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={mintData.amount} 
                    onChange={(e) => setMintData({ ...mintData, amount: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Token URI" 
                    value={mintData.tokenURI} 
                    onChange={(e) => setMintData({ ...mintData, tokenURI: e.target.value })} 
                />
                <button onClick={handleMint}>Mint NFT</button>
            </div>

            {/* Transfer NFT Section */}
            <div>
                <h2>Transfer NFT</h2>
                <input 
                    type="text" 
                    placeholder="Recipient Address" 
                    value={transferData.to} 
                    onChange={(e) => setTransferData({ ...transferData, to: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Token ID" 
                    value={transferData.tokenId} 
                    onChange={(e) => setTransferData({ ...transferData, tokenId: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={transferData.amount} 
                    onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })} 
                />
                <button onClick={handleTransfer}>Transfer NFT</button>
            </div>

            {/* Buy NFT Section */}
            <div>
                <h2>Buy NFT</h2>
                <input 
                    type="text" 
                    placeholder="Token ID" 
                    value={buyData.tokenId} 
                    onChange={(e) => setBuyData({ ...buyData, tokenId: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Price in ETH" 
                    value={buyData.price} 
                    onChange={(e) => setBuyData({ ...buyData, price: e.target.value })} 
                />
                <button onClick={handleBuy}>Buy NFT</button>
            </div>

            {/* Transaction History */}
            <h2>Transaction History</h2>
            <div>
                {transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <p key={index}>
                            NFT #{tx.tokenId} transferred from {tx.from} to {tx.to}
                        </p>
                    ))
                ) : (
                    <p>No Transactions Found</p>
                )}
            </div>
        </div>
    );
}

export default App;
