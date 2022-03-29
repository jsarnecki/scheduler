import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, cancelInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  
  
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const confirmCancel = function(id) {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY));
  }

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <>
    <Header time={time} />

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onConfirm={() => confirmCancel(props.id)} onCancel={back} message={"Are you sure you would like to delete?"} />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === EDIT && (
          <Form 
            student={interview.student}
            interviewer={interview.interviewer.id}
            interviewers={interviewers}
            onSave={save}
            onCancel={back}
        /> 
      )}
      
      {mode === SHOW && (
          <Show 
            student={interview.student}
            interviewer={interview.interviewer.name}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}

      {mode === CREATE && (
        <Form 
          onSubmit={console.log("Clicked")}
          interviewers={interviewers}
          onSave={save}
          onDelete={() => transition(CONFIRM)}
        />
      )}

    </>
  );
}