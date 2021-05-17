
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.js";
import {Row, Container, Col} from "react-bootstrap";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";
import SummaryList from "./components/SummaryList";
import EditOrder from "./components/EditOrder";
import Order from "./components/Order";
import Product from "./components/Product";
import Summary from "./components/Summary";
import EditSummary from "./components/EditSummary";
import EditProduct from "./components/EditProduct";
import MainScreen from "./components/MainScreen";
import Footer from "./components/Footer";
import FoodList from "./components/FoodsList";
import Foods from "./components/Foods";
import EditFood from "./components/EditFood";

 class App extends Component {

    render(){
      return(
          <Router>
          <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} className={"margin-top"}>
                      <Switch>
                          <Route path="/OrderList" exact component={OrderList}/>
                          <Route path={["/Home","/"]} exact component={MainScreen}/>
                          <Route path="/ProductList" exact component={ProductList}/>
                          <Route path="/SummaryList" exact component={SummaryList}/>
                          <Route path="/editOrder/:id" exact component={EditOrder}/>
                          <Route path="/editSummary/:id" exact component={EditSummary}/>
                          <Route path="/editProduct/:id" exact component={EditProduct}/>
                          <Route path="/createOrder" exact component={Order}/>
                          <Route path="/createSummary" exact component={Summary}/>
                          <Route path="/createProduct" exact component={Product}/>
                          <Route path="/foodList" exact component={FoodList}/>
                          <Route path="/editFood/:id" exact component={EditFood}/>
                          <Route path="/createFood" exact component={Foods}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
      <Footer/>
      </Router>)
      }
 }

export default App;
