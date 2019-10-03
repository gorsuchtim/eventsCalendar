"use strict";

import Utilities from "../Utilities/Utilities";
import EventsCalendar from "../EventsCalendar";
import handleBuildEvent from "./handleBuildEvent";
import handleBuildError from "./handleBuildError";

const getEvents = eventsToGet => eventsToGet || Utilities.getFile();

const handleCalendar = eventsToGet => {
  fetch(
    eventsToGet ||
      `${EventsCalendar.eventsFilePath}${Utilities.getMonthName()}.js`
  ).then(data => {
    if (data.status != 200) {
      handleBuildError();
    } else {
      data
        .json()
        .then(data => data.forEach(monthEvent => handleBuildEvent(monthEvent)));
    }
  });
  return true;
};
export default handleCalendar;

// ***** Fetch not supported in IE11: XMLHTttpRequest fallback:
/*
var xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  eventsToGet ||
    `${EventsCalendar.eventsFilePath}${Utilities.getMonthName()}.js`,
  false
);

xhr.onload = function() {
  if (this.status != 200) {
    handleBuildError();
  } else {
    var monthEvents = JSON.parse(this.responseText);
    monthEvents.forEach(monthEvent => {
      handleBuildEvent(monthEvent);
    });
  }
};

xhr.send();

*/
