import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

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
        axios.delete("http://localhost:8081/orders/deleteOrder/" + id)
            .then(resp => resp.data)
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
                        <th>Edit</th>
                        <th>Delete</th>
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
                                <td className={"align-middle"}><button>Edit</button></td>
                                <td className={"align-middle"}><button onClick={(e) => this.deleteRow(prod.prodID,e)}>Delete</button></td>
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