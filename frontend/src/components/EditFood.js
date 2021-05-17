import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form} from "react-bootstrap";
import MyToast from "./MyToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faSave} from "@fortawesome/free-solid-svg-icons";


export default class EditFood extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state =
            {
                message: ''
            }
        this.foodChange = this.foodChange.bind(this);
        this.updateFood = this.updateFood.bind(this);
    };

    initialState = {
        id:'', name:'', price: ''
    };

    componentDidMount() {
        const foodID =+ this.props.match.params.id;
        if(foodID) {this.findFoodByID(foodID);}
    }


    findFoodByID = (foodID) => {
        axios.get("http://localhost:8081/foods/getFoodById/" + foodID)
            .then (response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        price: response.data.price
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    };


    foodChange = event =>
    {
        this.setState({[event.target.name]:event.target.value });
    };

    updateFood = event =>
    {
        event.preventDefault();
        const food = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price

        };
        axios.put("http://localhost:8081/foods/updateFood/" +food.id ,food)
            .then(response => {
                if (response.data != null)
                {
                    console.log(response.data)
                    this.setState({"show":true,"method":"post",message: response.data.message});
                    setTimeout(() => this.setState({"show":false}),4000);
                    setTimeout(() => this.foodList(),4000);
                }
                else
                {
                    this.setState({"show":false});
                    console.log("Problem!");
                }
            });
        this.setState(this.initialState);
    };

    foodList = () => {
        return this.props.history.push("/foodList");
    }

    render() {
        const {id,name,price } = this.state;
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
                            <FontAwesomeIcon icon={faEdit} /> Update Food
                        </div>
                    </Card.Header>

                    <Form onSubmit={this.updateFood} id={"FoodForms"}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"fromGridId"}>
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  readOnly
                                                  name="prodId"
                                                  type="number"
                                                  value={id || ""}
                                                  onChange={this.foodChange}
                                                  className="bg-dark text-white"
                                    />
                                </Form.Group>
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
                                                  min={0}
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
                                <FontAwesomeIcon icon={faSave} />  Update
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
