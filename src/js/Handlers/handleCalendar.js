"use strict";

import utilities from "../Utilities/Utilities";
import App from "../App";
import handleValidation from "./handleValidation";
import handleCheckDate from "./handleCheckDate";
import EventTemplate from "../Templates/EventTemplate";
import elementFactory from "../Utilities/BuildElement";

const builder = (toBuild, appendTo) => {
  if (toBuild.length) {
    toBuild.forEach(build => {
      build.appendTo = appendTo;
      return elementFactory.init(build);
    });
  } else {
    toBuild.appendTo = appendTo;
    return elementFactory.init(toBuild);
  }
};

const populateEventTemplateDetails = monthEvent => {
  var eventDetailsContent = EventTemplate.details.map((detail, index) => {
    detail.content = monthEvent[index];
    return detail;
  });
  return eventDetailsContent;
};

// Return requested/arg month events OR current month events
const getEvents = eventsToGet =>
  eventsToGet ||
  utilities.getFile(`${App.eventsFilePath}${utilities.getMonthName()}.js`);

const handleCalendar = eventsToGet => {
  if (handleValidation(getEvents(eventsToGet))) {
    const monthEvents = utilities.parseFile(
      getEvents(eventsToGet).responseText
    );
    monthEvents.forEach(monthEvent => {
      builder(
        populateEventTemplateDetails(
          Object.keys(monthEvent).map(function(e) {
            return monthEvent[e];
          })
        ),
        builder(
          EventTemplate.detailsWrap,
          builder(
            EventTemplate.wrap,
            document.querySelector(".eventsCalendar__events")
          )
        )
      );
      if (monthEvent.register !== "") {
        if (handleCheckDate(monthEvent.date.split(" "))) {
          EventTemplate.register.attrs.href = monthEvent.register;
          builder(EventTemplate.register, EventTemplate.detailsWrap.appendTo);
        }
      }
    });
  }
  return true;
};
export default handleCalendar;
