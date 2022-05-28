import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../scripts/routes";

const LayoutHeader = () => {
    return (
        <Menu style={{ marginTop: "10px" }}>
            <Link route="/">
                <a className="item">CrowdFi</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Crowdfunds</a>
                </Link>
                <Link route="/crowdfunds/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

export default LayoutHeader;