
import axios from "axios";
import React, {Component} from "react";
import {Table} from "react-bootstrap";

export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount()
    {
    this.findAllOrder();
    }

    findAllOrder()
    {
        axios.get("http://localhost:8081/orders/list")
            .then(response => response.data)
            .then((data) => {
                this.setState({orders: data});
            });
    };

    render() {
        return(

            <div align="center">
                <br/>
            <Table style={{width: '1000px'}} bordered hover striped variant="dark" responsive>
                <thead className="text-info">
                <tr align="center">
                    <th>RendID</th>
                    <th>ProdName</th>
                    <th>TableID</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {this.state.orders.length === 0 ?
                    <tr align="center">
                        <td colSpan="6"> No Orders Available.</td>
                    </tr> :
                    this.state.orders.map((ord) => (
                        <tr key={ord.rendID} align="center">
                            <td className={"align-middle"}>{ord.rendID}</td>
                            <td className={"align-middle"}>{ord.prodName}</td>
                            <td className={"align-middle"}>{ord.tableID}</td>
                            <td className={"align-middle"}>{ord.date}</td>
                            <td className={"align-middle"}>{ord.price} Ft</td>
                            <td className={"align-middle"}>{ord.status}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>

            </div>
        )
    }
}
