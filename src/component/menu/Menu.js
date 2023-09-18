import React from 'react';
import './Menu.css';

import CupLineIcon from "remixicon-react/CupLineIcon";

import HeartLineIcon from "remixicon-react/HeartLineIcon";
import HeartFillIcon from "remixicon-react/HeartFillIcon";
import HeartAddFillIcon from 'remixicon-react/HeartAddFillIcon';

class CoffeeButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesChange = this.handleFavoritesChange.bind(this);
    this.handleChosenCoffeeTypeChange = this.handleChosenCoffeeTypeChange.bind(this);
  }

  handleFavoritesChange(e) {
    e.preventDefault();
    e.stopPropagation();

    // plays the sound of a button press
    let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4");
    audio.play();

    // sends the name of the coffee added to favorites
    if (!e.currentTarget.classList.contains("favoritesButton")) return;
    this.props.onFavoritesChange(
        e.currentTarget.parentElement.querySelector('label').innerText);
  }

  handleChosenCoffeeTypeChange(e) {
    e.preventDefault();

    // plays the sound of a button press
    let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/10");
    audio.play();

    if (!e.currentTarget.classList.contains("coffeeButton")) return;
    if (e.target.classList.contains("favoritesButton")) return;

    // saves the selected coffee type to history
    window.history.pushState(null, null, e.currentTarget.href);

    // sends a new page URL for the chosen coffee type
    this.props.onChosenCoffeeTypeChange(
        new URL(e.currentTarget.href).searchParams.get('coffee'));
  }

  render() {
    // picks up the icon depending on whether the coffee type has been added to favorites
    const heartIcon = this.props.coffee.liked ?
        <HeartFillIcon className="heartFillIcon" /> :
        <HeartAddFillIcon className="heartAddFillIcon" />;

    // the page parameter containing the selected type of coffee
    const href = "?coffee=" + this.props.coffee.name;

    return (
        <div>
          <a
              href={href}
              className="coffeeButton"
              onClick={this.handleChosenCoffeeTypeChange}
          >
            <div className="coffeeType">
              <CupLineIcon className="cupLineIcon" />
              <label>{this.props.coffee.name}</label>
            </div>
            <button
                className="favoritesButton"
                onClick={this.handleFavoritesChange}
            >{heartIcon}</button>
          </a>
        </div>
  );
  }
}

class CoffeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesChange = this.handleFavoritesChange.bind(this);
    this.handleChosenCoffeeTypeChange = this.handleChosenCoffeeTypeChange.bind(this);
  }

  handleFavoritesChange(name) {
    this.props.onFavoritesChange(name);
  }

  handleChosenCoffeeTypeChange(chosenCoffeeType) {
    this.props.onChosenCoffeeTypeChange(chosenCoffeeType);
  }

  render() {
    // coffee list display filters
    const filterText = this.props.filterText;
    const likedOnly = this.props.likedOnly;

    const coffeeButtons = [];

    // creates an array with buttons for different types of coffee
    this.props.coffeeTypes.forEach((coffeeType) => {
      if (coffeeType.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
      if (likedOnly && !coffeeType.liked) return;

      coffeeButtons.push(<CoffeeButton
          coffee={coffeeType}
          key={coffeeType.name}
          onFavoritesChange={this.handleFavoritesChange}
          onChosenCoffeeTypeChange={this.handleChosenCoffeeTypeChange}
      />)
    });

    return (
      <div className="coffeeTable">
        {coffeeButtons}
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleShowAllChange = this.handleShowAllChange.bind(this);
    this.handleShowLikedChange = this.handleShowLikedChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleShowAllChange() {
    this.props.onShowAllChange();
  }

  handleShowLikedChange() {
    this.props.onShowLikedChange();
  }

  render() {
    return (
      <form>
        <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
            autoFocus
        />
        <div className="filters">
          <a id="filterAll"
             onClick={this.handleShowAllChange}
             href="#/all"
          >Show all</a>
          <a id="filterLiked" href="#/favorites">
            <label
                id="labelLiked"
                htmlFor="filterLiked"
                onClick={this.handleShowLikedChange}
            ><HeartLineIcon className="likeCheckboxIcon" /></label>
          </a>
        </div>
      </form>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);

    // contains the state of the filters to display the coffee list
    this.state = {
      filterText: '',
      likedOnly: false
    };

    this.handleFavoritesChange = this.handleFavoritesChange.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleShowAllChange = this.handleShowAllChange.bind(this);
    this.handleShowLikedChange = this.handleShowLikedChange.bind(this);
    this.handleChosenCoffeeTypeChange = this.handleChosenCoffeeTypeChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    // sets a new filter text
    this.setState({
      filterText: filterText
    });
  }

  handleShowAllChange() {
    // sets a show all filter status
    this.setState({
      likedOnly: false
    })
  }

  handleShowLikedChange() {
    // sets a new liked only filter status
    this.setState({
      likedOnly: true
    })
  }

  handleFavoritesChange(name) {
    this.props.onFavoritesChange(name)
  }

  handleChosenCoffeeTypeChange(chosenCoffeeType) {
    this.props.onChosenCoffeeTypeChange(chosenCoffeeType);
  }

  render() {
    return (
      <div className="menu">
        <SearchBar
            filterText={this.state.filterText}
            likedOnly={this.state.likedOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onShowAllChange={this.handleShowAllChange}
            onShowLikedChange={this.handleShowLikedChange}
        />
        <CoffeeTable
            coffeeTypes={this.props.coffeeTypes}
            filterText={this.state.filterText}
            likedOnly={this.state.likedOnly}
            onFavoritesChange={this.handleFavoritesChange}
            onChosenCoffeeTypeChange={this.handleChosenCoffeeTypeChange}
        />
      </div>
    );
  }
}

export default Menu;