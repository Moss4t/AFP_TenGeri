import React from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

class SummaryList extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
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
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.summaries.length === 0 ?
                        <tr align="center">
                            <td colSpan="6"> No Summaries Aviable</td>
                        </tr> :
                        this.state.summaries.map((sum)=> (
                            <tr key={sum.SumId} align="center">
                                <td className={"align-middle"}>{sum.sumID}</td>
                                <td className={"align-middle"}>{sum.ordCount}</td>
                                <td className={"align-middle"}>{sum.date}</td>
                                <td className={"align-middle"}>{sum.summary}</td>
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