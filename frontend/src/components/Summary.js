import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form} from "react-bootstrap";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";


export default class Summary extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state =
            {
                message:''
            }
        this.summaryChange = this.summaryChange.bind(this);
        this.submitSummary = this.submitSummary.bind(this);
    }
    initialState = { sumId:'', ordCount:'', date:'', summary:''};

    resetSummary = () =>
    {
        this.setState(() => this.initialState);
    };

    submitSummary = event => {
        event.preventDefault();
        const summary = {
            date: this.state.date
        };
        axios.post("http://localhost:8081/summary/createSummary", summary)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true,message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.summaryList(),4000);
                    console.log(response.data)
                }
                else{
                    this.setState({"show":false});
                    console.log("Problem!");
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
        const {date} = this.state;
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast  show = {this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                <br/>
                <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"left"}} className="text-info">
                            <FontAwesomeIcon icon={faPlusSquare} /> Add New Summary
                        </div>
                    </Card.Header>
            <Form onSubmit={this.submitSummary} id={"SummaryForms"} onReset={this.resetSummary}>
                <Card.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId={"formGridDate"}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control required autoComplete="off"
                                      name="date"
                                      type="text"
                                      value={date || ""}
                                      onChange={this.summaryChange}
                                      className="bg-dark text-white"
                                      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                      placeholder="Format: 2021-01-01" />
                    </Form.Group>
                </Form.Row>
                </Card.Body>
                <Card.Footer>
                    <Button size={"sm"} variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave} />  Save
                    </Button>
                    &nbsp;&nbsp;
                    <Button size={"sm"} variant="info" type="reset">
                        <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>
                    &nbsp;&nbsp;
                    <Button size={"sm"} variant="info" type="button" onClick={this.summaryList.bind()}>
                        <FontAwesomeIcon icon={faList} /> Summary List
                    </Button>
                </Card.Footer>
            </Form>
                </Card>
            </div>
        )
    }
}
