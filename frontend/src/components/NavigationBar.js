import React from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

class NavigationBar extends React.Component
{
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Link to={"home"} className={"navbar-brand"}>
                    Home
                </Link>
                <Nav className="mr-auto">
                    <Link to={"OrderList"} className={"nav-link"}>Orders</Link>
                    <Link to={"ProductList"} className={"nav-link"}>Products</Link>
                    <Link to={"SummaryList"} className={"nav-link"}>Summary</Link>
                    <Link to={"createOrder"} className={"nav-link"}>AddOrder</Link>
                    <Link to={"createSummary"} className={"nav-link"}>AddSummary</Link>
                    <Link to={"createProduct"} className={"nav-link"}>AddProduct</Link>
                </Nav>
            </Navbar>
        )

    }
}
export default NavigationBar