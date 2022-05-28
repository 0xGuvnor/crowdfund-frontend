import React, { Component } from "react";
import factory from "../scripts/factory";
import Layout from "../components/layout";
import { Button, Card } from "semantic-ui-react";
import { Link } from "../scripts/routes";

class CrowdfundIndex extends Component {
  static async getInitialProps() {
    const crowdfunds = await factory.methods.getDeployedCrowdfunds().call();

    return { crowdfunds };
  };

  renderCrowdfunds() {
    const items = this.props.crowdfunds.map(address => {
      return {
        header: (
          <a
            className="header"
            href={`https://rinkeby.etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address}
          </a>
        ),
        description: (
          <Link route={`/crowdfunds/${address}`}>
            <a>View Crowdfund</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Crowdfunds</h3>

          <Link route="/crowdfunds/new">
            <a>
              <Button
                floated="right"
                content="Create Crowdfund"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCrowdfunds()}
        </div>
      </Layout>
    );
  };
};

export default CrowdfundIndex;