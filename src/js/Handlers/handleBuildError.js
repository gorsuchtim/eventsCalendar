"use strict";

import EventTemplate from "../Templates/EventTemplate";
import elementFactory from "../Utilities/BuildElement";
import ErrorMessage from "../Templates/ErrorMessage";

const handleBuildError = () => {
  var wrap = elementFactory.init(EventTemplate.wrap);

  ErrorMessage.appendTo = wrap;

  elementFactory.init(ErrorMessage);
};

export default handleBuildError;
