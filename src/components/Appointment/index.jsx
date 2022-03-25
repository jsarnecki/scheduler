import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { time, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <>
    <Header time={time} />
      {/*time ? 
      <article time={time} className="appointment">Appointment at {time}</article> 
        :
      <article time={time} className="appointment">No Appointments</article> 
      */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show 
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}

      {mode === CREATE && (
        <Form 
          onSubmit={console.log("Clicked")}
          interviewers={interviewers}
          onSave={console.log("Clicked")}
          onCancel={back}
        />
      )}

    </>
  );
}