import React, { Component } from 'react';
import './App.css';
import {getOrders, addOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  getAllOrders = () => {
    getOrders()
    .then(data => this.setState({orders: data.orders}))
    .catch(error => this.setState({error: 'We are having difficulties  with our server, please try again later!'}));
  }

  componentDidMount() {
   this.getAllOrders()
  }

  addNewOrder = (newBurrito) => {
    addOrder(newBurrito)
      .then(() => this.getAllOrders())
      .catch(error => this.setState({error: 'We are having difficulties  with our server, please try again later!'}));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder = {this.addNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
