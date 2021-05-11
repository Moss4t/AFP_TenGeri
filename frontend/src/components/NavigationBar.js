import React from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHamburger} from "@fortawesome/free-solid-svg-icons/faHamburger";

class NavigationBar extends React.Component
{
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={"Home"} className={"navbar-brand"}>
                    <FontAwesomeIcon icon={faHamburger} size={"lg"} />
                </Link>
                <Nav className="mr-auto">
                    <Link to={"OrderList"} className={"nav-link"}>Orders</Link>
                    <Link to={"ProductList"} className={"nav-link"}>Products</Link>
                    <Link to={"SummaryList"} className={"nav-link"}>Summary</Link>
                </Nav>
            </Navbar>
        )

    }
}
export default NavigationBar
