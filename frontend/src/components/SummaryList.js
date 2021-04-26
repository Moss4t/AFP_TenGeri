import React from "react";
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

class SummaryList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            summaries: []
        }
    }

    componentDidMount() {
        this.findAllSummary();
    }

    findAllSummary(){
        axios.get("http://localhost:8081/summary/list")
            .then(response => response.data)
            .then((data)=> {
                this.setState({summaries:data});
            });
    }

    deleteRow(id, e){
        axios.delete("http://localhost:8081/summary/deleteSummary/" + id)
            .then(resp => resp.data)
        setTimeout(window.location.reload(),1000)
    }

    render() {
        return(
            <div align="center">
                <br/>
                <Table style={{width: '1000px'}} bordered hover striped variant="dark" responsive>
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
                            <td colSpan="6"> No Summaries Available!</td>
                        </tr> :
                        this.state.summaries.map((sum)=> (
                            <tr key={sum.sumId} align="center">
                                <td className={"align-middle"}>{sum.sumId}</td>
                                <td className={"align-middle"}>{sum.ordCount}</td>
                                <td className={"align-middle"}>{sum.date}</td>
                                <td className={"align-middle"}>{sum.summary}</td>
                                <td className={"align-middle"}>
                                <ButtonGroup>
                                    <Link to={"editSummary/" +sum.sumId} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faEdit} /></Link>
                                    &nbsp;&nbsp;
                                    <Button size={"sm"} variant={"outline-danger"} onClick={(e) => this.deleteRow(sum.sumId,e)}>
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
export default SummaryList;
