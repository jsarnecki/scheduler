import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  //--------------------------------------------------------------------------


 //check how many null interviews are
  //We would need to take the appoiments arr from day, and loop thru each of those pertaining to appointments,
  // and count how many interviews are null..
  //Will need to check if it's the same spot being updated or if it's new
  const changeSpots = function(today, id, updateAppointments) {
    //get today.appointments arr
    let dayAppts;
    for (let day of state.days) {
      if (day.name === today) {
        dayAppts = day.appointments;
      }
    }
    //Appointments in obj - turn to arr
    //Then loop thru comparing if they are included in dayAppts, pushing appt into another arr
    //Count the nulls -- compare to previous days.day.spots count

    const appsArr = dayAppts.map(id => updateAppointments[id]);

    // const allAppointments = Object.values(updateAppointments);
    // let apptsArr = [];
    // for (let apt of allAppointments) {
    //   if (dayAppts.includes(apt.id)) {
    //     apptsArr.push(apt);
    //   }
    // }
 
    let nullCount = 0;
    for (let apt of appsArr) {
      if (apt.interview === null) {
        nullCount++;
      }
    }

    //GET ID === DAY TO ACCESS ARRAY
    
    //Using return val, check state.appts find the day with given ID, see if the slot is null
    //If slot is not null, means it's an edit - return with nothing
    //If slot is null, we check inside the state.days[id === day].spots -> is it same as returnVal?
    //If not, we change the state.days[day].spots appropriately, and set inside the state alongside the appointments
    //BUT WE MUST CHECK IF IT IS DOUBLE ADDING SPOTS OR NOT
    
    
    console.log("filtered appts arr", appsArr)
    console.log("null count", nullCount);
    
    return nullCount;
  }






  //-----------------------------------------------------------------------------------------
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        //Using the appointment id, can probably access updating the days.spots state
        //If using the bookInterview to save edits, we can't update the day.spots state everytime it's called.. need to check first

        const dayLookUp = {monday: 0, tuesday: 1};
        
        console.log("before setState:", id, state.days[0].name, state.days[0].spots);
        let spotCount = changeSpots(state.days[0].name, id, appointments);
        console.log("before addition:", state.days[0].spots, "after addition:", spotCount);
        const days = [...state.days];
        // const monday = days[0];
        days[0].spots = spotCount;
        // days[0] = monday;
        
        setState({...state, days: days,  appointments: appointments});
        // changeSpots(state.day, id);


      });
  }

  const cancelInterview = function(id) {
    const appointments = {...state.appointments};
    appointments[id].interview = null;
    console.log(`Appointment ${id} check`, appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}));
    }

    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

}