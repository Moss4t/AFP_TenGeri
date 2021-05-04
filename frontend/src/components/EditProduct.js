import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Jumbotron} from "react-bootstrap";


export default class EditOrder extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.productChange = this.productChange.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    };

    initialState = {
        id:'', prodId:'', prodName: '', prodCount: '', warehouseName: ''
    };

    componentDidMount() {
        const prodID =+ this.props.match.params.id;
        if(prodID) {this.findProductByID(prodID);}
    }


    findProductByID = (prodID) => {
        axios.get("http://localhost:8081/warehouse/getProdById/" + prodID)
            .then (response => {
                if(response.data != null) {
                    this.setState({
                        prodId: response.data.prodId,
                        prodName: response.data.prodName,
                        prodCount: response.data.prodCount,
                        warehouseName: response.data.warehouseName
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    };


    productChange = event =>
    {
        this.setState({[event.target.name]:event.target.value });
    };

    updateProduct = event =>
    {
        event.preventDefault();
        const product = {
            prodId: this.state.prodId,
            prodName: this.state.prodName,
            prodCount: this.state.prodCount,
            warehouseName: this.state.warehouseName

        };
        axios.put("http://localhost:8081/warehouse/updateProd/" +product.prodId ,product)
            .then(response => {
                if (response.data != null)
                {
                    console.log(response.data)
                    setTimeout(() => this.productList(),4000);
                }
                else
                {
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState);
    };

    productList = () => {
        return this.props.history.push("/ProductList")
    }

    render() {
        const {prodId, prodName, prodCount, warehouseName } = this.state;
        return(
            <div>
            <br/>
            <br/>
                <Jumbotron className="bg-light border border-dark">
            <Form onSubmit={this.updateProduct} id={"ProductForms"}>
                <Form.Row>
                    <Form.Group as={Col} controlId={"fromGridId"}>
                    <Form.Label>ID</Form.Label>
                    <Form.Control required autoComplete="off"
                                  readOnly
                                  name="prodId"
                                  type="number"
                                  value={prodId || ""}
                                  onChange={this.productChange}
                                  className="bg-dark text-white"
                                  placeholder="Enter Product Name" />
                </Form.Group>
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
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridCount"}>
                        <Form.Label>Count</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="prodCount"
                                      type="number"
                                      min={0}
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
                <br/>
                <br/>
                <Button size={"sm"} variant="success" type="submit">
                    Save
                </Button>
                &nbsp;&nbsp;
                <Button size={"sm"} variant="primary" type="submit" onClick={this.productList.bind()}>
                    Back
                </Button>
            </Form>
                </Jumbotron>
            </div>
        )
    }
}
