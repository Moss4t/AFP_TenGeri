import React from "react";
import axios from "axios";
import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faEdit, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import MyToast from "./MyToast";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

class FoodsList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            foods: [],
            search:'',
            message: ''
        }
    }

    componentDidMount() {
        this.findAllFood();
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
        this.findAllFood();
    };

    searchData = () =>
    {
        axios.get("http://localhost:8081/foods/search/"+this.state.search)
            .then(response => response.data)
            .then((data) => {
                this.setState({foods: data});
            });
    };

    findAllFood(){
        axios.get("http://localhost:8081/foods/list")
            .then(response => response.data)
            .then((data) =>{
                this.setState({foods: data})
            });
    }

    deleteRow(id,e){
        axios.delete("http://localhost:8081/foods/deleteFood/" + id)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, message: response.data.message});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.findAllFood(), 3000)
                } else {
                    this.setState({"show": false});
                }

            })


    }


    foodList = () => {
        return this.props.history.push("/foodsList")
    }

    render(){
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.message} type = {"danger"}/>
                </div>
                <br/>
                <br/>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <div style={{"float":"right"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup.Append >
                                    <Link to={"createFood"} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faPlus}/></Link>
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
                                <th>ID</th>
                                <th>FoodName</th>
                                <th>Price</th>
                                <th>Actions</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.foods.length === 0 ?
                                <tr align="center">
                                    <td colSpan="4">No Foods Available!</td>
                                </tr> :
                                this.state.foods.map((food) => (
                                    <tr key={food.id} align="center">
                                        <td className={"align-middle"}>{food.id}</td>
                                        <td className={"align-middle"}>{food.name}</td>
                                        <td className={"align-middle"}>{food.price} Ft</td>
                                        <td className={"align-middle"}>
                                            <ButtonGroup>
                                                <Link to={"editFood/" +food.id} className={"btn btn-sm btn-outline-info"}><FontAwesomeIcon icon={faEdit} /></Link>
                                                &nbsp;&nbsp;
                                                <Button size={"sm"} variant={"outline-danger"} onClick={(e) => this.deleteRow(food.id,e)}>
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
export  default FoodsList;
