import React from "react";
import styled from "@emotion/styled";
import Location from "./Location";
import Icon from "./Icon";
import Condition from "./Conditions.js";

//this is the weather card coponent

//task:
//1. is to change back ground colour depending on the temperature
//2. Display information

const WeatherCard = (props) => {
  let red = 0;
  let blue = 0;
  let highColour = 0;
  let lowColour = 0;

  if (props.temp >= 12) {
    //this if for hot weather
    highColour = (1 - (props.temp - 12) / 48) * 255;
    lowColour = highColour - 200;
    red = 255;
    blue = 10;
  } else if (props.temp < 12) {
    //this is for cold weather
    highColour = (1 - (props.temp + 10) / 22) * 255;
    lowColour = highColour + 150;
    red = 10;
    blue = 255;
  }

  const Card = styled.div`
    margin: 0 auto;
    background: linear-gradient(
      to top,
      rgba(${red}, ${highColour}, ${blue}),
      rgba(${red}, ${Math.abs(lowColour)}, ${blue})
    );
    width: 150px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    align-self: center;
  `;
  return (
    <Card>
      <Location country={props.country} city={props.city} />
      <Icon condition={props.condition} />
      <Condition condition={props.condition} temp={props.temp} />
    </Card>
  );
};

export default WeatherCard;
