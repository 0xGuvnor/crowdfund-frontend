import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/layout";
import Crowdfund from "../../../scripts/crowdfund";
import web3 from "../../../scripts/web3";
import { Link, Router } from "../../../scripts/routes";
import BreadcrumbNavigation from "../../../components/Breadcrumb";

class RequestNew extends Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        errorMessage: "",
        loading: false
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: "" });

        const crowdfund = Crowdfund(this.props.address);
        const { description, value, recipient } = this.state;
        const accounts = await web3.eth.getAccounts();

        try {
            await crowdfund.methods
                .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
                .send({ from: accounts[0] })

            Router.pushRoute(`/crowdfunds/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false, description: "", value: "", recipient: "" });
    };

    render() {
        return (
            <Layout>
                <BreadcrumbNavigation address={this.props.address} path={[0, 1, 2]} />

                <h3>Create a New Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value</label>
                        <Input
                            label="ETH"
                            labelPosition="right"
                            placeholder="E.g. 5"
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            label="Address"
                            labelPosition="right"
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Uh Oh! 😅" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        );
    };
};

export default RequestNew;