import React, {Component} from "react";
import axios from "axios";
import {Form, Button, Col, Jumbotron} from "react-bootstrap";

export default class Order extends Component
{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            tables: [],
            date : '',
            names: []
        };
        this.orderChange = this.orderChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    };

    initialState = {
        id:'', prodName:'', price:'', rendID:'', tableID:''
    };

    componentDidMount() {
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

    submitOrder = event =>
    {
        event.preventDefault();
        const order = {
            prodName: this.state.prodName,
            price: this.state.price,
            rendID: this.state.rendID,
            tableID: this.state.tableID
        };
        axios.post("http://localhost:8081/orders/createOrder",order)
            .then(response => {
                if (response.data != null)
                {
                    setTimeout(() => this.orderList(),4000);
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

    orderChange = event =>
    {
        this.setState({[event.target.name]:event.target.value });
    };
    render() {
        const {prodName, price, tableID} = this.state;
        return(
            <div>
                <br/>
                <br/>
                <Jumbotron className="bg-light border border-dark">
                    <Form onSubmit={this.submitOrder} id={"OrderForms"} >
                        <Form.Row>
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
                        <br/>
                        <Button size={"sm"} variant="success" type="submit">
                            Save
                        </Button>
                    </Form>
                </Jumbotron>

            </div>

        )
    }
};
