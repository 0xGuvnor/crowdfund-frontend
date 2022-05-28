import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Crowdfund from "../scripts/crowdfund";
import web3 from "../scripts/web3";
import { Router } from "../scripts/routes";

class ContributeForm extends Component {
    state = {
        value: "",
        loading: false,
        errorMessage: ""
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: "" });

        const crowdfund = Crowdfund(this.props.address);
        const accounts = await web3.eth.getAccounts();

        try {
            await crowdfund.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.replaceRoute(`/crowdfunds/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: "" });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ETH"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Uh Oh! 😅" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>Contribute</Button>
            </Form>
        );
    };
};

export default ContributeForm;