import React from "react";

const NFTGallery = ({ nfts }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
            {nfts.length > 0 ? (
                nfts.map((nft) => {
                    // ✅ Convert IPFS URL properly
                    let imageUrl = nft.image;
                    if (imageUrl.startsWith("ipfs://")) {
                        imageUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
                    }

                    return (
                        <div 
                            key={nft.id} 
                            style={{
                                border: "1px solid #ddd", 
                                padding: "15px", 
                                textAlign: "center", 
                                borderRadius: "10px",
                                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff"
                            }}>
                            <img 
                                src={imageUrl} 
                                alt={`NFT ${nft.id}`} 
                                width="200" 
                                style={{ borderRadius: "10px" }} 
                                onError={(e) => { 
                                    e.target.src = "https://via.placeholder.com/200"; // Backup Image
                                }} 
                            />
                            <p><strong>NFT #{nft.id}</strong></p>
                            <p><strong>Amount:</strong> {nft.amount}</p>
                        </div>
                    );
                })
            ) : (
                <p>No NFTs found.</p>
            )}
        </div>
    );
};

export default NFTGallery;
