import React from "react";
import {Jumbotron} from "react-bootstrap";

export default class MainScreen extends React.Component{


    render() {
        return (
                <div>
                    <br/>
                    <Jumbotron className="bg-dark text-white text-center ">
                        <h2>Restaurant Manager Web application</h2>
                        <blockquote className={"blockquote mb-0"}>
                            <footer className="blockquote-footer">
                                Created by: TenGeri team
                            </footer>
                        </blockquote>
                    </Jumbotron>

                    <Jumbotron className="bg-dark text-white text-center">
                        <h2>Information</h2>
                        <blockquote className={"blockquote mb-0"}>
                            <p>
                                This web application provides assistance to hospitality workers for both waiters and owners.
                                <br/>
                                <u><b>Opportunities:</b></u>
                                <li>Order Management (CRUD operations, Export, Search)</li>
                                <li>Warehouse Management (CRUD operations, Search)</li>
                                <li>Daily, Monthly summaries (CRUD operations, Export, Search) </li>
                            </p>
                        </blockquote>
                    </Jumbotron>
                    <br/>
                    <br/>
                </div>
        );
    }
}
