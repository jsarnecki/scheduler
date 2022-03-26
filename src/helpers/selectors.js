// export function getAppointmentsForDay(state, day) {
//   const filteredApptsForDay = [];
//   for (const d of state.days) {
//     //Loop thru days objs
//     if (d.name === day) {
//       //Find day name matched with given day arg
//       for (let id of d.appointments) {
//         //Loop thru the appointment ids of matched day
//         for (let obj in state.appointments) {
//           //Loop thru state.appointments obj to match against day ids
//           if (id == obj) {
//             //If the id of the days appointment matches the state.appoiments id, push into arr
//             filteredApptsForDay.push(state.appointments[obj]);
//           }
//         }
//       }
//     }
//   }
//   return filteredApptsForDay;
// }

export function getAppointmentsForDay(state, day) {
  let appointmentIdArr = [];
  for (const d of state.days) {
    if (d.name === day) {
      // If day arg matches day elm, spread all appointmentIds
      appointmentIdArr = [...d.appointments];  
    }
  }

  if (!appointmentIdArr.length) {
    //If no days match, return empty
    return [];
  }

  const appointmentsObjArr = Object.values(state.appointments);
  //Take the appointments obj of objs into arr
  const appointmentsReturn = appointmentsObjArr.filter(apt => {
    //Filter out the ids that match with given day apptIds
    if (appointmentIdArr.includes(apt.id)) {
      return apt;
    }
  });

  return appointmentsReturn;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const returnObj = {...interview};
  const id = interview.interviewer;
  for (const obj in state.interviewers) {
    if (obj == id) {
      returnObj.interviewer = state.interviewers[obj];
    }
  }
  return returnObj;
}

export function getInterviewersForDay(state, day) {
  const filteredInterviewersForDay = [];

  for (const d of state.days) {
    //Loop thru days objs
    if (d.name === day) {
      //Find day name matched with given day arg
      for (let id of d.interviewers) {
        //Loop thru the appointment ids of matched day
        for (let obj in state.interviewers) {
          //Loop thru state.interviewers obj to match against day ids
          if (id == obj) {
            //If the id of the days appointment matches the state.appoiments id, push into arr
            filteredInterviewersForDay.push(state.interviewers[obj]);
          }
        }
      }
    }
  }
  return filteredInterviewersForDay;
}
