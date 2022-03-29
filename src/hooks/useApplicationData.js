import react, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //check how many null interviews are
  //We would need to take the appoiments arr from day, and loop thru each of those pertaining to appointments,
  // and count how many interviews are null..
  //Will need to check if it's the same spot being updated or if it's new
  const changeSpots = function(today) {
    //get today.appointments arr
    let dayAppts;
      for (let day of state.days) {
        if (day.name === today) {
          dayAppts = day.appointments;
        }
      }

    console.log("appts today:", dayAppts);
  }


  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        //Using the appointment id, can probably access updating the days.spots state
        //If using the bookInterview to save edits, we can't update the day.spots state everytime it's called.. need to check first
        console.log("id", id);
        changeSpots(state.day);
        setState({...state, appointments: appointments});
      });
  }

  const cancelInterview = function(id) {
    const appointments = {...state.appointments};
    appointments[id].interview = null;
    console.log(`Appointment ${id} check`, appointments);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({...state, appointments}));
    }

    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

}