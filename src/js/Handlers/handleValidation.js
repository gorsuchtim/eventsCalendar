"use strict";
import EventTemplate from "../Templates/EventTemplate";
import ErrorMessage from "../Templates/ErrorMessage";
import elementFactory from "../Utilities/BuildElement";

const buildErrorMessage = () => {
  const wrap = elementFactory.init(EventTemplate.wrap);
  ErrorMessage.appendTo = wrap;
  elementFactory.init(ErrorMessage);
};

const handleValidation = checkFile => {
  if (checkFile.status === 404) {
    buildErrorMessage();
    return false;
  } else {
    return true;
  }
};

export default handleValidation;
