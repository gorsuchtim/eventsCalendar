"use strict";

import utilities from "../Utilities/Utilities";

const handleCheckDate = monthEvent => {
  var eventMonth = utilities.getMonthFromString(monthEvent[1]);
  var eventDay = Number(monthEvent[2].slice(0, -2));

  var currentMonth = Number(utilities.getMonth());
  var currentDay = Number(utilities.getDate());

  if (currentMonth < eventMonth) {
    return true;
  } else if (currentMonth === eventMonth) {
    if (currentDay <= eventDay) {
      return true;
    }
  } else {
    return false;
  }
};

export default handleCheckDate;
