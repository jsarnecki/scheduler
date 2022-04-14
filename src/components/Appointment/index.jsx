import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, cancelInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE ="ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // Uses transitions to navigate between booking states
    transition(SAVING, true);
    bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => {
      transition(ERROR_SAVE);
    })
  }

  const confirmCancel = function(id) {
    // Uses transitions to navigate between canceling states
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
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

      {mode === ERROR_DELETE && <Error message={"Oops!  Couldn't delete"} onClose={() => transition(back)} />}
      {mode === ERROR_SAVE && <Error message={"Oops!  Couldn't save"} onClose={() => transition(back)} />}

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
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

    </>
  );
}