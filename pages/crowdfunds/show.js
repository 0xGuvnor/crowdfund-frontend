import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/layout";
import Crowdfund from "../../scripts/crowdfund";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../scripts/routes";
import BreadcrumbNavigation from "../../components/Breadcrumb";


class CrowdfundShow extends Component {
    static async getInitialProps(props) {
        const crowdfund = Crowdfund(props.query.address);

        const summary = await crowdfund.methods.getSummary().call();

        return {
            balance: summary[0],
            minimumContribution: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: props.query.address
        };
    };

    renderCards() {
        const { balance, minimumContribution, requestsCount, approversCount, manager } = this.props;

        const items = [
            {
                header: `${balance / 1e18} ETH`,
                meta: "Crowdfund Balance",
                description: "How much money the crowdfund has left to spend.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: `${minimumContribution / 1e18} ETH`,
                meta: "Minimum Contribution to This Crowdfund",
                description: "You must contribute at least this much Ether to become an approver.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: `${requestsCount} Request(s) Made`,
                meta: "Number of Requests",
                description: "A request allows the manager to withdraw money from the contract, if the majority of the approvers accept.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: `${approversCount} Approver(s)`,
                meta: "Number of Approvers",
                description: "Number of people who have contributed to this crowdfund.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: (
                    <a
                        className="header"
                        href={`https://rinkeby.etherscan.io/address/${manager}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {manager}
                    </a>
                ),
                meta: "Address of the Crowdfund Manager",
                description: "The manager created this crowdfunding campaign, and can create requests to withdraw money.",
                style: { overflowWrap: "break-word" }
            }
        ];

        return <Card.Group items={items} />;
    };

    render() {
        return (
            <Layout>
                <BreadcrumbNavigation address={this.props.address} path={[0]} />
                <h3>Crowdfund Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/crowdfunds/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    };
};

export default CrowdfundShow;