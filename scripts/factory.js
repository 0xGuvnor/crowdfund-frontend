import web3 from "./web3";
import * as CrowdfundFactory from "../../artifacts/contracts/CrowdfundFactory.sol/CrowdfundFactory.json" assert {type: "json"};

const instance = new web3.eth.Contract(
    CrowdfundFactory.default.abi,
    "0x9886411a2483eAf9C62041925Ab0280b7AC4f24D"
);

export default instance;