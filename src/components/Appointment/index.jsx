import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {

  const { time, interview } = props;

  return (
    <>
    <Header time={time} />
      {time ? 
      <article time={time} className="appointment">Appointment at {time}</article> 
        :
      <article time={time} className="appointment">No Appointments</article> 
      }
        {interview ? 
        <Show student={interview.student} interviewer={interview.interviewer.name}/>
          :
        <Empty />
        }
    </>
  );
}