import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Jumbotron} from "react-bootstrap";


export default class Summary extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.summaryChange = this.summaryChange.bind(this);
        this.submitSummary = this.submitSummary.bind(this);
    }
    initialState = { sumId:'', ordCount:'', date:'', summary:''};

    submitSummary = event => {
        event.preventDefault();
        const summary = {
            sumId: this.state.sumId,
            ordCount: this.state.ordCount,
            date: this.state.date,
            summary: this.state.summary
        };
        axios.post("http://localhost:8081/summary/createSummary", summary)
            .then(response => {
                if(response.data != null){
                    setTimeout(() => this.summaryList(),4000);
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

    summaryChange = event => {
        this.setState({[event.target.name]:event.target.value});
    };

    render() {
        const {ordCount, date, summary} = this.state;
        return(
            <div>
                <br/>
                <br/>
                <Jumbotron className="bg-light border border-dark">
            <Form onSubmit={this.submitSummary} id={"SummaryForms"}>
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
            </Form>
                </Jumbotron>
            </div>
        )
    }
}
