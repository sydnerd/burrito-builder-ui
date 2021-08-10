import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleIngredientChange = (e, newIngredient) => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, newIngredient]})
  }

  handleNameChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
    const newBurrito = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }
    if(this.state.name && this.state.ingredients.length) {
      this.props.addNewOrder(newBurrito)
    } 
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className='ingredient-button'key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e, ingredient)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          className='name-input'
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className='order-selection'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit-button'onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
