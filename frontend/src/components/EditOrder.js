import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";


export default class EditOrder extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statuses : []
        };
        this.orderChange = this.orderChange.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
    };

    initialState = {
        id:'', prodName:'', price:'', date:'', status:'', rendID:'', tableID:''
    };

    componentDidMount() {
        const orderID =+ this.props.match.params.rendID;
        if(orderID) {this.findOrderByID(orderID);}
        this.findAllStatus();
    }

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
                        rendId: response.data.rendId,
                        tableId: response.data.tableId
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
            date: this.state.date,
            status: this.state.status,
            rendID: this.state.rendID,
            tableID: this.state.tableID
        };
        axios.put("http://localhost:8081/orders/updateOrder/" +order.rendID ,order)
            .then(response => {
                if (response.data != null)
                {
                    console.log(response.data)
                }
                else
                {
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState);
    };

    orderList = () => {
        return this.props.history.push("/orderList")
    }

    render() {
        const {prodName, price, status, tableID, date} = this.state;
        return(
            <Form onSubmit={this.updateOrder} id={"OrderForms"} >
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridName"}>
                        <Form.Label>ProductName</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="prodName"
                                      type="text"
                                      value={prodName || ""}
                                      maxLength={40}
                                      minLength={4}
                                      onChange={this.orderChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Product Name" />
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
                                      min={1}
                                      max={20}
                                      value={date || ""}
                                      onChange={this.orderChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Date" />
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
                        <Form.Control required autoComplete="off"
                                      name="tableID"
                                      type="number"
                                      value={tableID || ""}
                                      onChange={this.orderChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter tableID" />
                    </Form.Group>
                </Form.Row>
                <br/>
                <Button size={"sm"} variant="success" type="submit">
                    Save
                </Button>
                &nbsp;&nbsp;
                <Button size={"sm"} variant="primary" type="submit" onClick={this.orderList.bind()}>
                    Back
                </Button>
            </Form>
        )
    }
}