import React from "react";
import { useState } from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  const { name, selected, spots, setDay } = props;
  const dayClass = classNames({"day-list__item": true, "day-list__item--selected": selected, "day-list__item--full": spots === 0})

  const formatSpots = function(numOfSpots) {
    switch (numOfSpots) {
      case 0:
        return `no spots remaining`;
      case 1:
        return `1 spot remaining`;
      default:
        return `${numOfSpots} spots remaining`;
    }
  }

  return (
    <li className={dayClass}>
      <h1 onClick={() => {setDay(name)}}>
        {name}
      </h1>
      <h3>
        {formatSpots(spots)}
      </h3>
    </li>
  );
}