

export function getAppointmentsForDay(state, day) {
  const filteredApptsForDay = [];

  for (const d of state.days) {
    //Loop thru days objs
    if (d.name === day) {
      //Find day name matched with given day arg
      for (let id of d.appointments) {
        //Loop thru the appointment ids of matched day
        for (let obj in state.appointments) {
          //Loop thru state.appointments obj to match against day ids
          if (id == obj) {
            //If the id of the days appointment matches the state.appoiments id, push into arr
            filteredApptsForDay.push(state.appointments[obj]);
          }
        }
      }
    }
  }

  if (!filteredApptsForDay.length) {
    return [];
  }
  return filteredApptsForDay
};