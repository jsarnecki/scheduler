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
  const changeSpots = function(today, updateAppointments) {
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

    const apptsArr = dayAppts.map(id => updateAppointments[id]);

 
    let nullCount = 0;
    for (let apt of apptsArr) {
      if (apt.interview === null) {
        nullCount++;
      }
    }
    
    console.log("filtered appts arr", apptsArr)
    console.log("null count", nullCount);
    
    return nullCount;
  }

  const findDay = function(id) {
    const dayLookUp = {
      Monday: [1, 2, 3, 4, 5],
      Tuesday: [6, 7, 8, 9, 10],
      Wednesday: [11, 12, 13, 14, 15],
      Thursday: [16, 17, 18, 19, 20],
      Friday: [21, 22, 23, 24, 25]
    };

    const dayKeys = Object.keys(dayLookUp);
    const returnDay = dayKeys.find(key => dayLookUp[key].includes(id));
    // Gives day of the week the id param matches

    const dayId = dayKeys.indexOf(returnDay);
    // Finds the dayId of the returnDay
    console.log("dayID:", dayId);

    return { returnDay, dayId };
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

        const { returnDay, dayId } = findDay(id);
        
        console.log("before setState:", id, state.days[dayId].name, state.days[dayId].spots);

        let spotCount = changeSpots(returnDay, appointments);

        console.log("before addition:", state.days[dayId].spots, "after addition:", spotCount);

        const newDays = [...state.days];
        newDays[dayId].spots = spotCount;

        setState({...state, days: newDays,  appointments: appointments});


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