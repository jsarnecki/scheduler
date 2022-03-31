import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  const mappedInterviewers = interviewers.map((person) => {
    return <InterviewerListItem 
              key={person.id} 
              name={person.name} 
              avatar={person.avatar} 
              selected={person.id === value} 
              setInterviewer={() => onChange(person.id)} 
            />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;