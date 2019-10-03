"use strict";

import handleCheckDate from "./handleCheckDate";
import EventTemplate from "../Templates/EventTemplate";
import elementFactory from "../Utilities/BuildElement";

const populateEventTemplateDetails = monthEvent => {
  var eventDetailsContent = EventTemplate.details.map((detail, index) => {
    detail.content = monthEvent[index];
    return detail;
  });
  return eventDetailsContent;
};

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

const handleBuildEvent = monthEvent => {
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
};

export default handleBuildEvent;
