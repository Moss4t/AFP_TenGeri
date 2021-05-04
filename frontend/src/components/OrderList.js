import axios from "axios";
import React from "react";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

class OrderList extends React.Component {

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

    deleteRow(id,e){
        axios.delete("http://localhost:8081/orders/deleteOrder/" + id)
            .then(resp => resp.data)
        setTimeout(window.location.reload(),1000)
    }

    render() {
        return(
            <div>
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
                    <th>Actions</th>

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
                            <td className={"align-middle"}>
                            <ButtonGroup>
                                <Link to={"editOrder/" +ord.rendID} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faEdit} /></Link>
                                &nbsp;&nbsp;
                                <Button size={"sm"} variant={"outline-danger"} onClick={(e) => this.deleteRow(ord.rendID,e)}>
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
            </div>

        )
    }
}
export default OrderList;
