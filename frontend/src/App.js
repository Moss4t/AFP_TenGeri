
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import NavigationBar from "./components/NavigationBar.js";
import {Row, Container, Col} from "react-bootstrap";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";
import SummaryList from "./components/SummaryList";

 class App extends Component {

    render(){
      return(<Router>
          <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} className={"margin-top"}>
                      <Switch>

                          <Route path="/OrderList" exact component={OrderList}/>
                          <Route path="/ProductList" exact component={ProductList}/>
                          <Route path="/SummaryList" exact component={SummaryList}/>

                      </Switch>
                  </Col>
              </Row>
          </Container>

      </Router>)
      }
 }

export default App;
