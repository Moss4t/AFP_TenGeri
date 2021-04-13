import {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";


export default class EditProduct extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statuses : []
        };

    };

    initialState = {
        prodId:'', prodName: '', prodCount: '', warehouseName: ''
    };

    findProductById = (productId) => {
        axios.get("http://localhost:8081/warehouse/getProdById" +productId)
            .then (response => {
                if(response.data != null) {
                    this.setState( {
                        prodId: response.data.prodId,
                        prodName: response.data.prodName,
                        prodCount: response.data.prodCount,
                        warehouseName: response.data.warehouseName
                    });
                }
            }).catch((error) => {
                console.log("Error - " +error);
        });
    };

    productChange = event => {
        this.setState({[event.target.name]:event.target.value});
    };

    updateProduct = event =>
    {
        event.preventDefault();
        const product = {
            prodID: this.state.prodID,
            prodName: this.state.prodName,
            prodCount: this.state.prodCount,
            warehouseName: this.state.warehouseName
        };
        axios.put("http://localhost:8081/warehouse/updateProd" +product.prodID, product)
            .then(response => {
                if(response.data != null)
                {
                    console.log(response.data)
                }
                else
                {
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState)

    };

    render(){
        const {prodName, prodCount, warehouseName} = this.state;
        return(
            <Form onSubmit={this.updateProduct} id={"ProductForms"}>
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
                </Form.Row>
                <Form.Row>
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
                <Button size={"sm"} variant="success" type="submit">
                    Save
                </Button>
            </Form>
        )
    }
}