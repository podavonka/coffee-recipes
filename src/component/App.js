import React from 'react';
import './App.css';

import Menu from './menu/Menu';
import CupWindow from './cup/Cup';
import Recipe from './recipe/Recipe';

import data from './coffeeTypes.json'

class App extends React.Component {
  constructor(props) {
    super(props);

    // contains the current list of coffee types and the selected coffee type
    this.state = {
      coffeeTypes: data,
      chosenCoffeeType: JSON.parse(localStorage.getItem("chosenCoffeeType")) || "Cappuccino"
    };

    this.handleFavoritesChange = this.handleFavoritesChange.bind(this);
    this.handleChosenCoffeeTypeChange = this.handleChosenCoffeeTypeChange.bind(this);
  }

  componentDidMount() {
    // tracks the movement through the history of selected coffees
    window.addEventListener('popstate', e => {
      const hrefParam = new URL(window.location.href).searchParams.get('coffee');
      const currentCoffeeType = hrefParam ? hrefParam : "Cappuccino"

      this.handleChosenCoffeeTypeChange(currentCoffeeType);
    });
  }

  handleFavoritesChange(name) {
    // makes a copy of the coffee list
    let coffeeTypes = this.state.coffeeTypes.slice();

    // changes the add to favorites value to the opposite in the coffee list
    coffeeTypes = coffeeTypes.map(coffee => coffee.name === name ? {...coffee, liked: !coffee.liked} : coffee);
    console.log(coffeeTypes)

    // sets a modified array with a list of coffee types
    this.setState({
      coffeeTypes: coffeeTypes
    });

    // updates an array with a list of coffee types in the local storage
    localStorage.setItem("coffeeTypes", JSON.stringify(coffeeTypes));
  }

  handleChosenCoffeeTypeChange(chosenCoffeeType) {
    console.log(chosenCoffeeType)

    // sets a new chosen coffee type
    this.setState({
      chosenCoffeeType: chosenCoffeeType
    });

    // updates chosen coffee type in the local storage
    localStorage.setItem("chosenCoffeeType", JSON.stringify(chosenCoffeeType));
  }

  render() {
    document.title = this.state.chosenCoffeeType + " Recipe";

    // gets information about the selected coffee
    const chosenCoffeeType = this.state.coffeeTypes
        .find((coffeeType) => coffeeType.name === this.state.chosenCoffeeType);

    return (
      <div className="App">
        <Menu
            coffeeTypes={this.state.coffeeTypes}
            onFavoritesChange={this.handleFavoritesChange}
            onChosenCoffeeTypeChange={this.handleChosenCoffeeTypeChange}
        />
        <CupWindow
            cupFor={chosenCoffeeType}
        />
        <Recipe
            recipeFor={chosenCoffeeType}
        />
      </div>
    );
  }
}

export default App;
