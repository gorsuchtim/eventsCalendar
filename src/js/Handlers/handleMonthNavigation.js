"use strict";

import utilities from "../Utilities/Utilities";
import eventsCalendar from "../eventsCalendar";
import handleDomMonths from "./handleDomMonths";
import handleCalendar from "./handleCalendar";
import handleDisableButton from "./handleDisableButton";
import handleValidation from "./handleValidation";

var navButtons = utilities.toArray(
  document.querySelectorAll(".eventsCalendar__navigation")
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var currentMonthValue = utilities.getMonth();

const updateMonthValue = (element, monthValue) => {
  if (element.classList.contains("eventsCalendar__navigation--next")) {
    if (monthValue < 11) {
      monthValue++;
    }
  } else if (
    element.classList.contains("eventsCalendar__navigation--previous")
  ) {
    if (monthValue > utilities.getMonth() - 2) {
      monthValue--;
    }
  }
  handleDisableButton(element, navButtons, monthValue);
  return monthValue;
};

const handleEventsNavigation = element => {
  currentMonthValue = updateMonthValue(element, currentMonthValue);

  var monthValueElements = utilities.toArray(
    document.querySelectorAll("[monthvalue]")
  );

  monthValueElements.forEach(monthValueElement => {
    monthValueElement.setAttribute("monthvalue", currentMonthValue);
  });

  handleDomMonths(months[currentMonthValue]);
  document.querySelector(".eventsCalendar__events").innerHTML = "";

  handleCalendar(
    utilities.getFile(
      `${eventsCalendar.eventsFilePath}${months[currentMonthValue]}.js`
    )
  );
};

const setMonthNavEvents = () => {
  navButtons.forEach(navButton => {
    navButton.setAttribute("monthvalue", currentMonthValue);
    navButton.addEventListener("click", function() {
      handleEventsNavigation(this);
    });
  });
};

export default setMonthNavEvents;
