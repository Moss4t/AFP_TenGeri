import React from "react";
import axios from "axios";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faEdit, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import FileSaver from "file-saver";
import MyToast from "./MyToast";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

class ProductList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search:'',
            message: ''
        }
    }

    componentDidMount() {
        this.findAllProduct();
    }

    searchChange = event =>
    {
        this.setState(
            {
                [event.target.name]:event.target.value
            });
    };

    cancelSearch = () =>
    {
        this.setState({"search" :''});
        this.findAllProduct();
    };

    searchData = () =>
    {
        axios.get("http://localhost:8081/warehouse/search/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({products: data});
            });
    };

    findAllProduct(){
        axios.get("http://localhost:8081/warehouse/list")
            .then(response => response.data)
            .then((data) =>{
                this.setState({products: data})
            });
    }

    deleteRow(id,e){
        axios.delete("http://localhost:8081/warehouse/deleteProd/" + id)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, message: response.data.message});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.findAllProduct(), 3000)
                } else {
                    this.setState({"show": false});
                }

            })


    }

    exportData = () =>
    {
        FileSaver.saveAs(
            "http://localhost:8081/warehouse/export"
        );
    }

    productList = () => {
        return this.props.history.push("/productList")
    }

    render(){
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.message} type = {"danger"}/>
                </div>
                <br/>
                <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"right"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup.Append >
                                    <Link to={"createProduct"} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faPlus}/></Link>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button size={"sm"} variant={"outline-info"} title="Export to excel" type={"button"} onClick={this.exportData}>
                                        <FontAwesomeIcon icon={faFileExport} />
                                    </Button>
                                </InputGroup.Append>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <FormControl placeholder={"Search"} name={"search"} value={this.state.search} className={"border border-info bg-dark text-white"}
                                             onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size={"sm"} variant={"outline-info"} type={"button"} onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    &nbsp;
                                    <Button size={"sm"} variant={"outline-danger"} type={"button"} onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark" responsive>
                    <thead className="text-info">
                    <tr align="center">
                        <th>ProdID</th>
                        <th>ProdName</th>
                        <th>ProdCount</th>
                        <th>WarehouseName</th>
                        <th>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.length === 0 ?
                        <tr align="center">
                            <td colSpan="5">No Products Available!</td>
                        </tr> :
                        this.state.products.map((prod) => (
                            <tr key={prod.prodId} align="center">
                                <td className={"align-middle"}>{prod.prodId}</td>
                                <td className={"align-middle"}>{prod.prodName}</td>
                                <td className={"align-middle"}>{prod.prodCount}</td>
                                <td className={"align-middle"}>{prod.warehouseName}</td>
                                <td className={"align-middle"}>
                                <ButtonGroup>
                                    <Link to={"editProduct/" +prod.prodId} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faEdit} /></Link>
                                    &nbsp;&nbsp;
                                    <Button size={"sm"} variant={"outline-danger"} onClick={(e) => this.deleteRow(prod.prodId,e)}>
                                        <FontAwesomeIcon icon={faTrash}  />
                                    </Button>
                                </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <br/>
                <br/>
            </div>
        )
    }
}
export  default ProductList;
