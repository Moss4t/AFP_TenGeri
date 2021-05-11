import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form} from "react-bootstrap";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faSave} from "@fortawesome/free-solid-svg-icons";


export default class EditOrder extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statuses : [],
            tables: [],
            names: [],
            message: ''
        };
        this.orderChange = this.orderChange.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
    };

    initialState = {
        id:'', prodName:'', price:'', date:'', status:'', rendID:'', tableID:''
    };

    componentDidMount() {
        const orderID =+ this.props.match.params.id;
        if(orderID) {this.findOrderByID(orderID);}
        this.findAllStatus();
        this.findAllTableID();
        this.findAllNames();
    }

    findAllTableID = () => {
        axios.get("http://localhost:8081/orders/tableID")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    tables: [{value:'',display:'Select TableID'}]
                        .concat(data.map(table => {
                            return {value:table, display:table}
                        }))
                });
            });
    };

    findAllNames = () => {
        axios.get("http://localhost:8081/orders/listNames")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    names: [{value:'',display:'Select Food'}]
                        .concat(data.map(name => {
                            return {value:name, display:name}
                        }))
                });
            });
    };

    findAllStatus = () => {
        axios.get("http://localhost:8081/orders/category")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    statuses: [{value:'',display:'Select Status'}]
                        .concat(data.map(status => {
                            return {value:status, display:status}
                        }))
                });
            });
    };

    findOrderByID = (orderID) => {
        axios.get("http://localhost:8081/orders/getOrderById/" +orderID)
            .then (response => {
                if(response.data != null) {
                    this.setState({
                        prodName: response.data.prodName,
                        price: response.data.price,
                        date: response.data.date,
                        status: response.data.status,
                        rendID: response.data.rendID,
                        tableID: response.data.tableID
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    };


    orderChange = event =>
    {
        this.setState({[event.target.name]:event.target.value });
    };

    updateOrder = event =>
    {
        event.preventDefault();
        const order = {
            prodName: this.state.prodName,
            price: this.state.price,
            //date: this.state.date,
            status: this.state.status,
            rendID: this.state.rendID,
            tableID: this.state.tableID,

        };
        axios.put("http://localhost:8081/orders/updateOrder/" +order.rendID ,order)
            .then(response => {
                if (response.data != null)
                {
                    this.setState({"show":true,"method":"post",message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.orderList(),4000);
                    console.log(response.data)
                }
                else
                {
                    this.setState({"show":false});
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState);
    };

    orderList = () => {
        return this.props.history.push("/orderList")
    }

    render() {
        const {rendID,prodName, price, status, date, tableID } = this.state;
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast  show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                <br/>
                <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"left"}} className="text-info">
                            <FontAwesomeIcon icon={faEdit} /> Update Order
                        </div>
                    </Card.Header>
                    <Form onSubmit={this.updateOrder} id={"OrderForms"} >
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"fromGridId"}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  readOnly
                                                  name="rendId"
                                                  type="number"
                                                  value={rendID || ""}
                                                  onChange={this.orderChange}
                                                  className="bg-dark text-white"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridName"}>
                                    <Form.Label>ProductName</Form.Label>
                                    <Form.Control required as="select"
                                                  onChange={this.orderChange}
                                                  name="prodName"
                                                  value={prodName || ""}
                                                  className="bg-dark text-white">
                                        {this.state.names.map(name =>
                                            <option key={name.value} value={name.value}>
                                                {name.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPrice"}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  name="price"
                                                  type="number"
                                                  min={1}
                                                  max={100000}
                                                  value={price || ""}
                                                  onChange={this.orderChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Order Price" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridDate"}>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  name="date"
                                                  type="text"
                                                  readOnly
                                                  value={date || ""}
                                                  onChange={this.orderChange}
                                                  className="bg-dark text-white"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridStatus"}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control required as="select"
                                                  onChange={this.orderChange}
                                                  name="status"
                                                  value={status || ""}
                                                  className="bg-dark text-white">
                                        {this.state.statuses.map(status =>
                                            <option key={status.value} value={status.value}>
                                                {status.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridTableID"} >
                                    <Form.Label>TableID</Form.Label>
                                    <Form.Control required as="select"
                                                  onChange={this.orderChange}
                                                  name="tableID"
                                                  value={tableID || ""}
                                                  className="bg-dark text-white">
                                        {this.state.tables.map(table =>
                                            <option key={table.value} value={table.value}>
                                                {table.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button size={"sm"} variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />  Update
                            </Button>
                            &nbsp;&nbsp;
                            <Button size={"sm"} variant="info" type="button" onClick={this.orderList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Order List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
