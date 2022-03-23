import React from 'react';
import "./styles.scss";

export default function Appointment(props) {

  const { time } = props;

  return (
    <>
      {time ? 
      <article time={time} className="appointment">Appointment at {time}</article> 
        :
      <article time={time} className="appointment">No Appointments</article> 
      }
    </>
  );
}