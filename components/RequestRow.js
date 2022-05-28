import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../scripts/web3";
import Crowdfund from "../scripts/crowdfund";
import { Router } from "../scripts/routes";

class RequestRow extends Component {
    onApprove = async () => {
        const crowdfund = Crowdfund(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await crowdfund.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/crowdfunds/${this.props.address}/requests`);
    };

    onFinalise = async () => {
        const crowdfund = Crowdfund(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await crowdfund.methods.finaliseRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/crowdfunds/${this.props.address}/requests`);
    };

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalise = request.approvalCount > (approversCount / 2);

        return (
            <Row disabled={request.isComplete} positive={readyToFinalise && !request.isComplete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.isComplete ? null : (
                        <Button
                            color="green"
                            basic
                            onClick={this.onApprove}
                        >
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.isComplete ? null : (
                        <Button
                            color="teal"
                            basic
                            onClick={this.onFinalise}
                        >
                            Finalise
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    };
};

export default RequestRow;