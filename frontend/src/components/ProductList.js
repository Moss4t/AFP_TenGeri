import React from "react";
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

class ProductList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.findAllProduct();
    }

    findAllProduct(){
        axios.get("http://localhost:8081/warehouse/list")
            .then(response => response.data)
            .then((data) =>{
                this.setState({products: data})
            });
    }

    deleteRow(id,e){
        axios.delete("http://localhost:8081/warehouse/deleteProd/" + id)
            .then(resp => resp.data)
        setTimeout(window.location.reload(),1000)


    }
    productList = () => {
        return this.props.history.push("/productList")
    }

    render(){
        return(
            <div align="center">
                <br/>
                <Table style={{width: '1000px'}} bordered hover striped variant="dark" responsive>
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
                            <td colSpan="6">No Products Available!</td>
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
            </div>
        )
    }
}
export  default ProductList;
