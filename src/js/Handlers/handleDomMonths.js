'use strict'

import utilities from '/utilities'

const validateDomMonths = toValidate => toValidate !== undefined ? true : false;

const handleDomMonths = (updatedMonthName) => {
  const monthNames = [].slice.call(document.querySelectorAll('.eventsCalendar__monthName'))
    .map(element => element.textContent = updatedMonthName || utilities.getMonthName())

  // Return true if every index in monthNames returns with a value and not as undefined
  return monthNames.every(validateDomMonths);
}

export default handleDomMonths;