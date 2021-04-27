import React,{Component} from "react";
import {Col, Container, Navbar} from "react-bootstrap";

export default class Footer extends Component
{

    render() {
        let fullYear = new Date().getFullYear();
        return(
            <Navbar fixed={"bottom"} bg={"dark"} variant={"dark"}>
                <Container>
                        <Col lg={12} className="text-center text-white">
                            <div style={{'fontSize':'18px'}}>{fullYear}-{fullYear+1}, &copy; All Rights Reserved by Tengeri Team</div>
                        </Col>
                </Container>
            </Navbar>
        );
    };
}