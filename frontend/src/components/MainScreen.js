import React from "react";
import OrderList from "./OrderList";
import {Button} from "react-bootstrap";
import SummaryList from "./SummaryList";
import ProductList from "./ProductList";
import CreateOrder from "./CreateOrder";


export default class MainScreen extends React.Component{

    constructor() {
        super();
        this.onClick = this.onClick.bind(this)
        this.state = {
            arr: [
                {name: "OrderList", isActive: false, comp: <OrderList/>},
                {name: "SummaryList", isActive: false, comp: <SummaryList/>},
                {name: "ProductList", isActive: false, comp: <ProductList/>},
                {name: "CreateOrder", isActive: false, comp: <CreateOrder/>}
            ]
        };
    }

    onClick(index) {
        let tmp = this.state.arr;
        tmp[index].isActive = !tmp[index].isActive;
        this.setState({arr: tmp});
    }

    render() {
        return (
            <div>
                {this.state.arr.map((el, index) =>
                    <Button onClick={() => this.onClick(index)}>{el.name}</Button>
                )}
                <div>
                    {
                        this.state.arr.map((el)=>
                            el.isActive ? el.comp : null
                        )
                    }
                </div>
            </div>
        );
    }
}