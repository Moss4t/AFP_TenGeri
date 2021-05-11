import React, {Component} from "react";
import axios from "axios";
import {Form, Button, Col, Card} from "react-bootstrap";
import {faList, faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MyToast from "./MyToast";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";

export default class Order extends Component
{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            tables: [],
            date : '',
            names: [],
            message:''
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

    resetProduct = () =>
    {
        this.setState(() => this.initialState);
    };

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
                    this.setState({"show":true,message: response.data.message});
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

    orderChange = event =>
    {
        this.setState({[event.target.name]:event.target.value });
    };
    render() {
        const {prodName, price, tableID} = this.state;
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
                            <FontAwesomeIcon icon={faPlusSquare} /> Add New Order
                        </div>
                    </Card.Header>
                    <Form onSubmit={this.submitOrder} onReset={this.resetProduct} id={"OrderForms"} >
                        <Card.Body>
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
                        </Card.Body>
                        <Card.Footer>
                            <Button size={"sm"} variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />  Save
                            </Button>
                            &nbsp;&nbsp;
                            <Button size={"sm"} variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
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
};
