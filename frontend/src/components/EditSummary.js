import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form} from "react-bootstrap";


export default class EditSummary extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statuses : []
        };
        this.summaryChange = this.summaryChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
    };
    initialState = { id:'', sumId:'', ordCount:'', date:'', summary:''};

    componentDidMount() {
        const summaryId =+ this.props.match.params.id;
        if(summaryId) {
            this.findSummaryById(summaryId);
        }
    }

    findSummaryById = (summaryId) => {
        axios.get("http://localhost:8081/summary/getSummaryById/" +summaryId)
            .then (response => {
                if(response.data != null) {
                    this.setState({
                        sumId: response.data.sumId,
                        ordCount: response.data.ordCount,
                        date: response.data.date,
                        summary: response.data.summary
                    });
                }
            }).catch((error) => {
                console.error("Error - " +error);
        });
    };

    summaryChange = event => {
        this.setState({[event.target.name]:event.target.value});
    };

    updateSummary = event => {
        event.preventDefault();
        const summary = {
            sumId: this.state.sumId,
            ordCount: this.state.ordCount,
            date: this.state.date,
            summary: this.state.summary
        };
        axios.put("http://localhost:8081/summary/updateSummary/" +summary.sumId, summary)
            .then(response => {
                if(response.data != null){
                    console.log(response.data)
                }
                else{
                    console.log("Porblem!");
                }
            });
        this.setState(this.initialState);
    };

    summaryList = () => {
        return this.props.history.push("/summaryList")
    }

    render() {
        const {ordCount, date, summary} = this.state;
        return(
            <Form onSubmit={this.updateSummary} id={"SummaryForms"}>
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridOrdCount"}>
                        <Form.Label>OrderCount</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="ordCount"
                                      type="number"
                                      min={1}
                                      max={100000}
                                      value={ordCount || ""}
                                      onChange={this.summaryChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Order Count" />
                    </Form.Group>
                    <Form.Group as={Col} controlId={"formGridDate"}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="date"
                                      type="text"
                                      min={1}
                                      max={20}
                                      value={date || ""}
                                      onChange={this.summaryChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter Date" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridSummary"}>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="summary"
                                      type="number"
                                      min={1}
                                      max={100000}
                                      value={summary || ""}
                                      onChange={this.summaryChange}
                                      className="bg-dark text-white"
                                      placeholder="Enter summary" />
                    </Form.Group>
                </Form.Row>
                <br/>
                <Button size={"sm"} variant="success" type="submit">
                    Save
                </Button>
                &nbsp;&nbsp;
                <Button size={"sm"} variant="primary" type="submit" onClick={this.summaryList.bind()}>
                    Back
                </Button>
            </Form>
        )
    }
}