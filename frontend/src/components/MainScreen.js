import React from "react";
import OrderList from "./OrderList";
import {Button} from "react-bootstrap";
import SummaryList from "./SummaryList";
import ProductList from "./ProductList";


export default class MainScreen extends React.Component{

    constructor() {
        super();
        this.onClick = this.onClick.bind(this)
        this.state = {
            arr: [
                {name: "OrderList", isActive: true, comp: <OrderList/>},
                {name: "SummaryList", isActive: true, comp: <SummaryList/>},
                {name: "ProductList", isActive: true, comp: <ProductList/>}
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