'use strict'

import utilities from '/utilities'

const handleCheckDate = (monthEvent) => {
  const eventMonth = utilities.getMonthFromString(monthEvent[1]);
  const eventDay = Number(monthEvent[2].slice(0, -2));

  const currentMonth = Number(utilities.getMonth());
  const currentDay = Number(utilities.getDate());

  if (currentMonth < eventMonth) {
    return true;
  } else if (currentMonth === eventMonth) {
    if (currentDay <= eventDay) {
      return true
    }
  } else {
    return false;
  }
}

export default handleCheckDate;