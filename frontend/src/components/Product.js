import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form, Jumbotron} from "react-bootstrap";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";


export default class Product extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            message:''
        };

        this.productChange = this.productChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    };

    initialState = {
        prodId:'', prodName: '', prodCount: '', warehouseName: ''
    };
    resetProduct = () =>
    {
        this.setState(() => this.initialState);
    };

    submitProduct = event =>
    {
        event.preventDefault();
        const product = {
            prodId: this.state.prodId,
            prodName: this.state.prodName,
            prodCount: this.state.prodCount,
            warehouseName: this.state.warehouseName
    };
        axios.post("http://localhost:8081/warehouse/createProd", product)
            .then(response => {
                if(response.data != null)
                {
                    this.setState({"show":true,message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.productList(),4000);
                    console.log(response.data)
                }
                else
                {
                    this.setState({"show":false});
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState)

    };
    productChange = event => {
        this.setState({[event.target.name]:event.target.value});
    };

    productList = () => {
        return this.props.history.push("/productList")
    }

    render(){
        const {prodName, prodCount, warehouseName} = this.state;
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
                        <FontAwesomeIcon icon={faPlusSquare} /> Add New Product
                    </div>
                </Card.Header>
            <Form onSubmit={this.submitProduct} onReset={this.resetProduct} id={"ProductForms"}>
                <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridName"}>
                        <Form.Label>ProductName</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="prodName"
                                      type="text"
                                      value={prodName || ""}
                                      maxLength={40}
                                      minLenth={4}
                                      onChange={this.productChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Product Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId={"formGridCount"}>
                        <Form.Label>Count</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="prodCount"
                                      type="number"
                                      min={1}
                                      max={100000}
                                      value={prodCount || ""}
                                      onChange={this.productChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Product Count" />
                    </Form.Group>
                    <Form.Group as={Col} controlId={"formGridWarehouse"}>
                        <Form.Label>Warehouse Name</Form.Label>
                        <Form.Control required autoComlete="off"
                                      name="warehouseName"
                                      type="text"
                                      value={warehouseName || ""}
                                      maxLength={40}
                                      mindLength={4}
                                      onChange={this.productChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Warehouse Name" />
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
                    <Button size={"sm"} variant="info" type="button" onClick={this.productList.bind()}>
                        <FontAwesomeIcon icon={faList} /> Product List
                    </Button>
                </Card.Footer>
            </Form>
                </Card>
            </div>
        )
    }
}
