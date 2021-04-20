import {Component} from "react";
import axios from "axios";
import {Button, Col, Form} from "react-bootstrap";


export default class Product extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statuses : []
        };
        this.productChange = this.productChange.bind(this);
        this.submitProduct = this.submitProduct.bind(this);
    };

    initialState = {
        prodId:'', prodName: '', prodCount: '', warehouseName: ''
    };

    componentDidMount() {
        this.findAllStatus();
    }

    findAllStatus = () => {
        axios.get("http://localhost:8081/warehouse/list")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    statuses: [{value:'', display:'SelectStatus'}]
                        .concat(data.map(status => {
                            return {value: status, display: status}
                        }))
                });
            });
    };

    submitProduct = event =>
    {
        event.preventDefault();
        const product = {
            prodID: this.state.prodID,
            prodName: this.state.prodName,
            prodCount: this.state.prodCount,
            warehouseName: this.state.warehouseName
    };
        axios.post("http://localhost:8081/warehouse/createProd", product)
            .then(response => {
                if(response.data != null)
                {
                    setTimeout(() => this.productList(),3000);
                    console.log(response.data)
                }
                else
                {
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
            <Form onSubmit={this.submitProduct} id={"ProductForms"}>
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