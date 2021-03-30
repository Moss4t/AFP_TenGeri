import React from "react";
import axios from "axios";

class CreateOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    handleChange = event => {
        this.setState({ProdName: event.target.value,
                            TableID: event.target.value,
                            Date: event.target.value,
                            Price: event.target.value,
                            Status: event.target.value
                            });
    }

    handleSubmit = event => {
        event.preventDefault();

        const order ={
            ProdName: this.state.orders.ProdName,
            TableID: this.state.orders.TableID,
            Date: this.state.orders.Date,
            Price: this.state.orders.Price,
            Status: this.state.orders.Status
        };

        axios.post("http://localhost:8081/orders/createOrder", order)
            .then((resp) => {
                console.log(resp.data)
            }).catch((error) => {
                console.log(error)
        });

        this.setState({ProdName: '', TableID: '', Date:'', Price: '', Status: ''})
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        ProdName:
                        <input type="text" name="ProdName" onChange={this.handleChange} />
                    </label>
                    <label>
                        TableID:
                        <input type="number" name="TableID" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Date:
                        <input type="text" name="Date" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Price:
                        <input type="number" name="Price" onChange={this.handleChange}/>
                    </label>
                    <label>
                        <select name="Status" onChange={this.handleChange}>
                            <option value="ACTIVE">Active</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}
export default CreateOrder;