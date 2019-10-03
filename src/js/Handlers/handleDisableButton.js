"use strict";

import Utilities from "../Utilities/Utilities";

var disableForwardNav = 11;
var disableBackwardNav = Utilities.getMonth() - 2;

const checkForDisabled = navButtons => {
  navButtons.forEach(navButton => {
    if (navButton.getAttribute("disabled")) {
      removeDisabled(navButton);
    }
  });
  return true;
};

const removeDisabled = navButton => navButton.removeAttribute("disabled");

const disableButton = element => element.setAttribute("disabled", "true");

const handleDisableButton = (element, navButtons, monthValue) =>
  checkForDisabled(navButtons)
    ? monthValue == disableForwardNav || monthValue == disableBackwardNav
      ? disableButton(element)
      : false
    : false;

export default handleDisableButton;
