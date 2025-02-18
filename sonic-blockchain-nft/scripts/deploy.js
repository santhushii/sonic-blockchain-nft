const hre = require("hardhat");

async function main() {
    const provider = new hre.ethers.JsonRpcProvider("https://rpc.blaze.soniclabs.com");
    
    // Load wallet from private key (ensure it's in .env)
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log(`Deploying contract with account: ${wallet.address}`);

    // Get the contract factory
    const SonicNFT = await hre.ethers.getContractFactory("SonicNFT", wallet);

    // Deploy the contract
    const sonicNFT = await SonicNFT.deploy();

    await sonicNFT.waitForDeployment();  // Wait for contract deployment

    console.log(`SonicNFT deployed to: ${sonicNFT.target}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
