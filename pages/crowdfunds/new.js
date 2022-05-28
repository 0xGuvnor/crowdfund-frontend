import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layout";
import factory from "../../scripts/factory";
import web3 from "../../scripts/web3";
import { Router } from "../../scripts/routes";
import BreadcrumbNavigation from "../../components/Breadcrumb";

class CrowdfundNew extends Component {
    state = {
        minimumContribution: "",
        errorMessage: "",
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCrowdfund(web3.utils.toWei(this.state.minimumContribution, "ether"))
                .send({ from: accounts[0] });
            const address = await factory.methods.getDeployedCrowdfunds().call();

            Router.pushRoute(`/crowdfunds/${address[address.length - 1]}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <BreadcrumbNavigation path={[0]} />
                <h3>Create a Crowdfunding Campaign</h3>

                {/* Using !! to convert the error message as a string into a boolen to pass into the error prop */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="ETH"
                            labelPosition="right"
                            placeholder="E.g. 0.1"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Uh Oh! 😅" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>
                        Create
                    </Button>
                </Form>
            </Layout>
        )
    };
};

export default CrowdfundNew;