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

  componentDidMount() {
    getOrders()
      .then(data => this.setState({orders: data.orders}))
      .catch(error => this.setState({error: 'We are having difficulties  with our server, please try again later!'}));
  }

  addNewOrder = (newBurrito) => {
    addOrder(newBurrito)
      .then(() => getOrders())
      .catch(error => this.setState({error: 'We are having difficulties  with our server, please try again later!'}));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
