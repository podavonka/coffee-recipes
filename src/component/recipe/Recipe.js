import React from "react";
import './Recipe.css';

import BubbleChartFillIcon from "remixicon-react/BubbleChartFillIcon";
import DropFillIcon from "remixicon-react/DropFillIcon";
import ArchiveLineIcon from "remixicon-react/ArchiveLineIcon";
import ShoppingBasketLineIcon from "remixicon-react/ShoppingBasketLineIcon";

function Ingredient(props) {
  // creates icons for ingredients
  let ingredientIcon;
  switch (props.name) {
    case "coffee beans":
      ingredientIcon = <BubbleChartFillIcon className="bubbleChartFillIcon ingredientIcon" />;
      break;
    case "water":
      ingredientIcon = <DropFillIcon className="dropFillIcon ingredientIcon" />;
      break;
    case "milk":
      ingredientIcon = <ArchiveLineIcon className="archiveLineIcon ingredientIcon" />;
      break;
    default:
      ingredientIcon = <ShoppingBasketLineIcon className="shoppingBasketLineIcon ingredientIcon" />;
  }

  return (
      <div className="ingredient">
        <div className="ingredientIconBox">{ingredientIcon}</div>
        <div>{props.name}<br/>{props.amount}</div>
      </div>
  );
}

function Recipe(props) {
  const recipeFor = props.recipeFor;

  // creates an array with ingredients for making coffee
  const ingredients = [];
  recipeFor.ingredients.forEach((ingredient) => {
    ingredients.push(<Ingredient
        key={ingredient.name}
        name={ingredient.name}
        amount={ingredient.amount}
    />)
  });

  // creates an array with elements containing the steps of coffee making
  const steps = [];
  recipeFor.recipe.forEach((step, index) => {
    steps.push(<li key={index}>{step}</li>)
  });

  return (
      <div className="recipe">
        <header>Recipe</header>
        <div className="underHeader">
          <div className="ingredients">{ingredients}</div>
          <ol>{steps}</ol>
        </div>
      </div>
  );
}

export default Recipe;