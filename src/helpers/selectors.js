
export function getAppointmentsForDay(state, day) {
  let appointmentIdArr = [];
  for (const d of state.days) {
    if (d.name === day) {
      // If day arg matches day elm, spread all appointmentIds
      appointmentIdArr = [...d.appointments];  
    }
  }

  if (!appointmentIdArr.length) {
    // If no days match, return empty
    return [];
  }

  const appointmentsObjArr = Object.values(state.appointments);
  // Take the appointments obj of objs into arr
  const appointmentsReturn = appointmentsObjArr.filter(apt => {
    // Filter out the ids that match with given day apptIds
    if (appointmentIdArr.includes(apt.id)) {
      return apt;
    }
  });

  return appointmentsReturn;
}


export function getInterview(state, interview) {
  // The given interview only has the interviewer's id
  // Return an obj that adds the obj of the interviewer from state
  if (!interview) {
    return null;
  }

  const returnObj = {...interview};
  const id = interview.interviewer;

  const interviewersArr = Object.values(state.interviewers);
  for (let person of interviewersArr) {
    if (person.id === id) {
      returnObj.interviewer = person;
    }
  }

  return returnObj;
}

export function getInterviewersForDay(state, day) {
  //Returns an array of interviewerObjs pertaining to the given day

  let interviewersIds = [];
  for (let d of state.days) {
    if (d.name === day) {
      // d.interviewers is an array of interviewers' ids
      interviewersIds = [...d.interviewers];
    }
  }

  if (!interviewersIds.length) {
    return [];
  }

  const interviewerObjArr = Object.values(state.interviewers);

  const filteredInterviewersForDay = interviewerObjArr.filter(interviewer => {
    if (interviewersIds.includes(interviewer.id)) {
      // Compares and filters based on the ids
      return interviewer;
    }
  });

  return filteredInterviewersForDay;
}
