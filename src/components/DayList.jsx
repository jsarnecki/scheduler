import React from "react";
import './DayListItem';
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const newDays = days.map((dayObj) => {
    return <DayListItem
              key={dayObj.id}
              name={dayObj.name}
              spots={dayObj.spots}
              selected={dayObj.name === value}
              setDay={() => onChange(dayObj.name)}
            />
  });

  return (
    <ul>
      {newDays}
    </ul>
  );
}