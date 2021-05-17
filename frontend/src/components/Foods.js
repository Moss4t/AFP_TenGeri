import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form} from "react-bootstrap";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";


export default class Foods extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            message:''
        };

        this.foodChange = this.foodChange.bind(this);
        this.submitFood = this.submitFood.bind(this);
    };

    initialState = {
        id:'',name:'',price:''
    };
    resetFood = () =>
    {
        this.setState(() => this.initialState);
    };

    submitFood = event =>
    {
        event.preventDefault();
        const food = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price
        };
        axios.post("http://localhost:8081/foods/createFood", food)
            .then(response => {
                if(response.data != null)
                {
                    this.setState({"show":true,message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.foodList(),4000);
                    console.log(response.data)
                }
                else
                {
                    this.setState({"show":false});
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState)

    };
    foodChange = event => {
        this.setState({[event.target.name]:event.target.value});
    };

    foodList = () => {
        return this.props.history.push("/foodList")
    }

    render(){
        const { name, price} = this.state;
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
                            <FontAwesomeIcon icon={faPlusSquare} /> Add New Food
                        </div>
                    </Card.Header>
                    <Form onSubmit={this.submitFood} onReset={this.resetFood} id={"FoodForms"}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridName"}>
                                    <Form.Label>FoodName</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  name="name"
                                                  type="text"
                                                  value={name || ""}
                                                  maxLength={40}
                                                  minLenth={4}
                                                  onChange={this.foodChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Food Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPrice"}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  name="price"
                                                  type="number"
                                                  min={1}
                                                  max={100000}
                                                  value={price || ""}
                                                  onChange={this.foodChange}
                                                  className="bg-dark text-white"
                                                  placeholder="Enter Food Price" />
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
                            <Button size={"sm"} variant="info" type="button" onClick={this.foodList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Food List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
