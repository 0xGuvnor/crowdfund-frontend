import React, { Component } from "react";
import { Breadcrumb } from "semantic-ui-react";

class BreadcrumbNavigation extends Component {
    render() {
        const sections = [
            {
                key: "home",
                link: true,
                content: (<a href="http://localhost:3000/">Home</a>)
            },
            {
                key: "details",
                link: true,
                content: <a href={`http://localhost:3000/crowdfunds/${this.props.address}`}>Crowdfund Details</a>
            },
            {
                key: "requests",
                link: true,
                content: <a href={`http://localhost:3000/crowdfunds/${this.props.address}/requests`}>View Requests</a>
            }
        ];

        const renderedPath = this.props.path.map(index => sections[index]);

        return < Breadcrumb divider="/" sections={renderedPath} />;
    };
};

export default BreadcrumbNavigation;