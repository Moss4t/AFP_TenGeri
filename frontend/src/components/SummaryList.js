import React from "react";
import axios from "axios";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import MyToast from "./MyToast";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import FileSaver from "file-saver";

class SummaryList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            summaries: [],
            search:'',
            message: ''
        }
    }

    componentDidMount() {
        this.findAllSummary();
    }

    exportData = () =>
    {
        FileSaver.saveAs(
            "http://localhost:8081/summary/export"
        );
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
        this.findAllSummary();
    };

    searchData = () =>
    {
        axios.get("http://localhost:8081/summary/search/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({summaries: data});
            });
    };

    findAllSummary(){
        axios.get("http://localhost:8081/summary/list")
            .then(response => response.data)
            .then((data)=> {
                this.setState({summaries:data});
            });
    }

    deleteRow(id, e){
        axios.delete("http://localhost:8081/summary/deleteSummary/" + id)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, message: response.data.message});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.findAllSummary(), 3000)
                } else {
                    this.setState({"show": false});
                }

            })
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
                                    <Link to={"createSummary"} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faPlus}/></Link>
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
                        <th>SumID</th>
                        <th>OrderCount</th>
                        <th>Date</th>
                        <th>Summary</th>
                        <th>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.summaries.length === 0 ?
                        <tr align="center">
                            <td colSpan="5"> No Summaries Available!</td>
                        </tr> :
                        this.state.summaries.map((sum)=> (
                            <tr key={sum.sumId} align="center">
                                <td className={"align-middle"}>{sum.sumId}</td>
                                <td className={"align-middle"}>{sum.ordCount} db</td>
                                <td className={"align-middle"}>{sum.date}</td>
                                <td className={"align-middle"}>{sum.summary} Ft</td>
                                <td className={"align-middle"}>
                                    <Button size={"sm"} variant={"outline-danger"} onClick={(e) => this.deleteRow(sum.sumId,e)}>
                                        <FontAwesomeIcon icon={faTrash}  />
                                    </Button>
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
export default SummaryList;
