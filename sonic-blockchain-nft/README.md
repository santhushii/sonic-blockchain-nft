# Sonic Blockchain NFT

## Introduction
Sonic Blockchain NFT is a decentralized NFT platform that allows users to mint, buy, and sell NFTs securely using smart contracts on the Ethereum blockchain.

## Features
- **Minting NFTs:** Users can mint new NFTs on the blockchain.
- **Buying & Selling:** Marketplace functionality for users to trade NFTs.
- **Wallet Integration:** Connect with MetaMask for transactions.
- **IPFS Storage:** Securely store NFT metadata using IPFS.

## Technologies Used
- **Solidity**: Smart contracts development.
- **Hardhat**: Ethereum development environment.
- **React.js**: Frontend user interface.
- **Ethers.js**: Blockchain interaction.
- **IPFS & Pinata**: Decentralized storage for metadata.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [Hardhat](https://hardhat.org/)
- [MetaMask Wallet](https://metamask.io/)
- [IPFS](https://ipfs.tech/)
- [Pinata](https://www.pinata.cloud/) (for hosting metadata)

## Project Setup

### 1️⃣ Clone the Repository
git clone https://github.com/santhushii/sonic-blockchain-nft.git
cd sonic-blockchain-nft

2️⃣ Install Dependencies
npm install

3️⃣ Compile & Deploy Smart Contracts
npx hardhat compile
npx hardhat deploy --network localhost

4️⃣ Start the Development Server
cd frontend
npm install
npm start


