import React from "react";
import OrderList from "./OrderList";
import {Button} from "react-bootstrap";
import SummaryList from "./SummaryList";
import ProductList from "./ProductList";
import Order from "./Order";
import Summary from "./Summary";
import Product from "./Product";


export default class MainScreen extends React.Component{

    constructor() {
        super();
        this.onClick = this.onClick.bind(this)
        this.state = {
            arr: [
                {name: "OrderList", isActive: false, comp: <OrderList/>},
                {name: "SummaryList", isActive: false, comp: <SummaryList/>},
                {name: "ProductList", isActive: false, comp: <ProductList/>},
                {name: "Order", isActive: false, comp: <Order/>},
                {name: "Summary", isActive: false, comp: <Summary />},
                {name: "Product", isActive: false, comp: <Product />}
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