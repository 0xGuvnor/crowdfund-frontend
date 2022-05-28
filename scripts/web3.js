import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser & metamask is installed
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We are in the server OR metamask is not installed
    const provider = new Web3.providers.HttpProvider(
        "https://eth-rinkeby.alchemyapi.io/v2/Qc0EMS4dxGxL6PcVI2BtD25rqfNsYrKY"
    );
    web3 = new Web3(provider);
}

export default web3;