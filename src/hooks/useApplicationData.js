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

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    });
  }, []);

  const changeSpots = function(today, updateAppointments) {
    let dayAppts;
    // Find all days (array of appt ids) that pertain to the day being passed in
    for (let day of state.days) {
      if (day.name === today) {
        dayAppts = day.appointments;
      }
    }

    const apptsArr = dayAppts.map(id => updateAppointments[id]);
    // With the array of appt ids, filter the updatedAppts that hold that id

    let nullCount = 0;
    // Count all the null values, ie empty appt blocks
    for (let apt of apptsArr) {
      if (apt.interview === null) {
        nullCount++;
      }
    }
    
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

    return { returnDay, dayId };
  }

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

        const { returnDay, dayId } = findDay(id);
        // Using appt id, returns the day string, and the id pertaining to the day
        const spotCount = changeSpots(returnDay, appointments);
        // Returns nullCount of appointment blocks in the given day, counting the new appointments obj

        const newDays = [...state.days];
        // Updates the spots using the return nullCount, accessing the id/index of state.days with dayId
        newDays[dayId].spots = spotCount;

        setState({...state, days: newDays,  appointments: appointments});
      });
  }

  const cancelInterview = function(id) {
    const appointments = {...state.appointments};
    appointments[id].interview = null;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {

        const { returnDay, dayId } = findDay(id);
        const spotCount = changeSpots(returnDay, appointments);
        // Returns nullCount of appointment blocks in the given day, counting the new appointments obj

        const newDays = [...state.days];
        // Update spots of specific day
        newDays[dayId].spots = spotCount;

        setState({...state, days: newDays,  appointments: appointments});
      });
    }

    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

}