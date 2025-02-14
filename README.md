"# Sonic Blockchain NFT" 
#Install Dependencies
npm install

#Run Tests (Check If Everything Works)
npx hardhat test

#Deploy Locally (Hardhat Network)
npx hardhat ignition deploy ./ignition/modules/Token.js

# Start the Frontend
cd frontend
npm install
npm start

This will start the frontend on:http://localhost:3000
