import web3 from "./web3";
import * as Crowdfund from "../../artifacts/contracts/Crowdfund.sol/Crowdfund.json" assert {type: "json"};

export default (address) => {
    return new web3.eth.Contract(
        Crowdfund.default.abi,
        address
    );
};