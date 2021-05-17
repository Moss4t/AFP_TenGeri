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
        this.state =
            {
                message: ''
            }
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
                    this.setState({"show":true,"method":"post",message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.productList(),4000);
                }
                else
                {
                    this.setState({"show":false});
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
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast  show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
            <br/>
            <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"left"}} className="text-info">
                            <FontAwesomeIcon icon={faEdit} /> Update Product
                        </div>
                    </Card.Header>

            <Form onSubmit={this.updateProduct} id={"ProductForms"}>
                <Card.Body>
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
                </Card.Body>
                <Card.Footer>
                    <Button size={"sm"} variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} />  Update
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
