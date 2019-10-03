"use strict";

import Utilities from "../Utilities/Utilities";

const handleCheckDate = monthEvent => {
  var eventMonth = Utilities.getMonthFromString(monthEvent[1]);
  var eventDay = Number(monthEvent[2].slice(0, -2));

  var currentMonth = Number(Utilities.getMonth());
  var currentDay = Number(Utilities.getDate());

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
