import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../components/layout";
import { Link } from "../../../scripts/routes";
import BreadcrumbNavigation from "../../../components/Breadcrumb";
import Crowdfund from "../../../scripts/crowdfund";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const crowdfund = Crowdfund(address);
        const requestCount = await crowdfund.methods.requestId().call();
        const approversCount = await crowdfund.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return crowdfund.methods.requests(index).call();
            })
        );

        return { address, requestCount, requests, approversCount };
    };

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    };

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <BreadcrumbNavigation address={this.props.address} path={[0, 1]} />
                <h3>Requests</h3>
                <Link route={`/crowdfunds/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>
                            Create New Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalise</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    };
};

export default RequestIndex;