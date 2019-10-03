"use strict";

import Utilities from "./Utilities/Utilities";
import handleDomMonths from "./Handlers/handleDomMonths";
import handleCalendar from "./Handlers/handleCalendar";
import setMonthNavEvents from "./Handlers/handleMonthNavigation";

const EventsCalendar = {
  eventsFilePath: "/src/js/Calendar/",
  init() {
    const calendar = document.querySelector(".eventsCalendar__section");
    if (Utilities.testForElement(calendar)) {
      if (handleDomMonths()) {
        if (handleCalendar()) {
          setMonthNavEvents();
        }
      }
    }
  }
};

export default EventsCalendar;
