import './Cup.css';
import React from "react";

function ColorsLegend(props) {
  // gets a list of colors in a picture with an animation of filling a coffee mug
  const coffeeColorsSet = new Set(props.cupFor.colors
      .map((color) => color.stopColor));

  // generates descriptions of color values in a picture with an animation of filling a coffee mug
  let coffeeColors = []
  coffeeColorsSet.forEach((color) => {
    let ingredient = "";
    switch (color) {
      case "transparent":
        return;
      case "#86563a":
        ingredient = "coffee";
        break;
      case "#faebd7":
        ingredient = "milk";
        break;
      case "#fdf5e6":
        ingredient = "milk foam";
        break;
      case "#fffaf0":
        ingredient = "whipped cream";
        break;
      case "#d2691e":
        ingredient = "maple syrup";
        break;
      case "#593927":
        ingredient = "chocolate chips";
        break;
      case "#cc8e69":
        ingredient = "coffee foam";
        break;
      case "#bb5c44":
        ingredient = "Irish whiskey";
        break;
      default:
        ingredient = "unknown";
    }

    const colorStyle = {
      backgroundColor: color
    };
    coffeeColors.push(<span key={color} style={colorStyle}>{ingredient}</span>)
  });

  return (
      <div className="colorsLegend">
          {coffeeColors}
      </div>
  );
}

function Cup(props) {
  const cupFor = props.cupFor;

  // gets a list of colors to create layers in the coffee mug filling animation
  let coffeeColors = [];
  cupFor.colors.forEach((color, index) => {
    coffeeColors.push(<stop key={index} offset={color.offset} stopColor={color.stopColor} stopOpacity="100%"/>)
  });

  return (
      <div className="cupContainer">
        <div className="steamContainer">
          <span className="steam"></span>
          <span className="steam"></span>
          <span className="steam"></span>
        </div>
        <svg viewBox="0 0 175 175">
          <defs>
            {/* contains an animation of filling a coffee mug */}
            <mask id="coffee-mask">
              <rect className="mask-rect"
                    x="50" y="0"
                    width="110" height="110"
                    fill="#ffffff">
                <animateTransform attributeName="transform"
                                  type="translate"
                                  values="0 200; 0 75; 0 200"
                                  dur="7s" repeatCount="indefinite" />
              </rect>
            </mask>
            {/* contains the color filling of the coffee mug */}
            <linearGradient id="solids" x1="0%" y1="0%" x2="0%" y2="100%">
              {coffeeColors}
            </linearGradient>
          </defs>

          {/* the inside of the coffee mug */}
          <path d="M 48 50 l 10 100 a 6,6 0 0 0 6,6 h 48 a 6,6 0 0 0 6,-6 l 10 -100"
                mask="url(#coffee-mask)"
                fill="url(#solids)"
                id="coffee"
          />

          {/* the outside of the coffee mug */}
          <path d="M 43 45 l 10 110 a 7,7 0 0 0 7,7 h 56 a 7,7 0 0 0 7,-7 l 10 -110"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                id="cup"
          />

          {/* bottom part of the lid for the coffee mug */}
          <rect x="36" y="25" rx="7" ry="7" width="104" height="20"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
          />

          {/* top part of the lid for the coffee mug */}
          <path d="M 47 25 l 7 -15 a 7,7 0 0 1 6,-4 h 56 a 7,7 0 0 1 6,4 l 7 15"
                fill="transparent"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
          />
        </svg>
      </div>
  );
}

function CupWindow(props) {
  const cupFor = props.cupFor;

  return (
      <div className="cupWindow">
        <h1>{cupFor.name}</h1>
        <div className="cupOverflow">
          <Cup cupFor={cupFor} />
          <ColorsLegend cupFor={cupFor}></ColorsLegend>
        </div>
      </div>
  );
}

export default CupWindow;