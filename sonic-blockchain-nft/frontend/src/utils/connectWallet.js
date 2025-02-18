import { BrowserProvider } from "ethers";

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    if (accounts[0].toLowerCase() !== "0x7e94E85c2d643902DB63C5bB8F7970D29A712d7A".toLowerCase()) {
      alert("Please connect to the correct MetaMask account: 0x7e94E85c2d643902DB63C5bB8F7970D29A712d7A");
      return;
    }

    return { provider, signer, address: accounts[0] };
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
};

export default connectWallet;
