// Import scss
import "../css/scss/style.scss";

// Import jquery
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// Import components
import utilities from "./Utilities/Utilities";
import handleDomMonths from "./Handlers/handleDomMonths";
import handleCalendar from "./Handlers/handleCalendar";
// import setMonthNavEvents from "./Handlers/handleMonthNavigation";

const eventsCalendar = {
  eventsFilePath: "/src/js/Calendar/",
  init() {
    const calendar = document.querySelector(".eventsCalendar__section");
    if (utilities.testForElement(calendar)) {
      if (handleDomMonths()) {
        if (handleCalendar()) {
          // setMonthNavEvents();
        }
      }
    }
  }
};

eventsCalendar.init();
