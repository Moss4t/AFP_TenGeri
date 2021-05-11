import axios from "axios";
import React from "react";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import FileSaver from "file-saver";
import MyToast from "./MyToast";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            search:'',
            message: ''
        }
    }

    componentDidMount()
    {
        this.findAllOrder();
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
        this.findAllOrder();
    };

    searchData = () =>
    {
        axios.get("http://localhost:8081/orders/search/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({orders: data});
            });
    };

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
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, message: response.data.message});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.findAllOrder(), 3000)
                } else {
                    this.setState({"show": false});
                }

            })
    }

    exportData = () =>
    {
        FileSaver.saveAs(
            "http://localhost:8081/orders/export"
        );
    }

    render() {
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.message} type = {"danger"}/>
                </div>
                <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"right"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup.Append >
                                    <Link to={"createOrder"} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faPlus}/></Link>
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
                                    <td colSpan="7"> No Orders Available.</td>
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
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <br/>
                <br/>
            </div>

        )
    }
}
export default OrderList;
