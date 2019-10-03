"use strict";

import Utilities from "../Utilities/Utilities";

const validateDomMonths = toValidate =>
  toValidate != undefined ? true : false;

const handleDomMonths = updatedMonthName => {
  // Get all instances of month name in the DOM and update to month name passed to this
  //function OR current month name via getMonthName()

  var monthNames = Utilities.toArray(
    document.querySelectorAll(".eventsCalendar__monthName")
  );

  monthNames.map(
    monthName =>
      (monthName.textContent = updatedMonthName || Utilities.getMonthName())
  );

  // Return true if every index in monthNames returns with a value and not as undefined
  return monthNames.every(validateDomMonths);
};

export default handleDomMonths;
