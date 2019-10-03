// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/Utilities/Utilities.js":[function(require,module,exports) {
"use strict"; // this = !this

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var utilities = {
  ariaToggle: function ariaToggle(element, attr) {
    return element.setAttribute(attr, element.getAttribute(attr) == "false");
  },
  class_add: function class_add(element) {
    for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classNames[_key - 1] = arguments[_key];
    }

    classNames.forEach(function (className) {
      return element.classList.add(className);
    });
    return element;
  },
  class_remove: function class_remove(element) {
    for (var _len2 = arguments.length, classNames = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      classNames[_key2 - 1] = arguments[_key2];
    }

    classNames.forEach(function (className) {
      return element.classList.remove(className);
    });
    return element;
  },
  getMonth: function getMonth() {
    var date = new Date();
    return date.getMonth();
  },
  getDate: function getDate() {
    var date = new Date();
    return date.getDate();
  },
  getMonthName: function getMonthName() {
    var date = new Date();
    return date.toLocaleString("en-us", {
      month: "long"
    });
  },
  getMonthFromString: function getMonthFromString(month) {
    return new Date(Date.parse(month + " 1, 2012")).getMonth();
  },
  iOSTest: function iOSTest() {
    var iDevices = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod", "MacIntel"];

    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()) {
          return true;
        }
      }
    }

    return false;
  },
  iOSSafariTest: function iOSSafariTest() {
    utilities.iOSTest() && navigator.userAgent.toLowerCase().indexOf("chrome") == -1 ? true : false;
  },
  isEmptyObj: function isEmptyObj(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  },
  parseFile: function parseFile(fileName) {
    var parsedFile = JSON.parse(fileName);
    return parsedFile;
  },
  setAttributes: function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }

    return el;
  },
  testForElement: function testForElement(element) {
    if (element !== null) {
      return true;
    }
  },
  toArray: function toArray(list) {
    if (Array.from) {
      return Array.from(list);
    } else {
      var newArray = [];

      for (var i = 0; i < list.length; i++) {
        newArray.push(list[i]);
      }

      return newArray;
    }
  }
};
var _default = utilities;
exports.default = _default;
},{}],"js/Handlers/handleDomMonths.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("../Utilities/Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateDomMonths = function validateDomMonths(toValidate) {
  return toValidate != undefined ? true : false;
};

var handleDomMonths = function handleDomMonths(updatedMonthName) {
  // Get all instances of month name in the DOM and update to month name passed to this
  //function OR current month name via getMonthName()
  var monthNames = _Utilities.default.toArray(document.querySelectorAll(".eventsCalendar__monthName"));

  monthNames.map(function (monthName) {
    return monthName.textContent = updatedMonthName || _Utilities.default.getMonthName();
  }); // Return true if every index in monthNames returns with a value and not as undefined

  return monthNames.every(validateDomMonths);
};

var _default = handleDomMonths;
exports.default = _default;
},{"../Utilities/Utilities":"js/Utilities/Utilities.js"}],"js/Handlers/handleCheckDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("../Utilities/Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleCheckDate = function handleCheckDate(monthEvent) {
  var eventMonth = _Utilities.default.getMonthFromString(monthEvent[1]);

  var eventDay = Number(monthEvent[2].slice(0, -2));
  var currentMonth = Number(_Utilities.default.getMonth());
  var currentDay = Number(_Utilities.default.getDate());

  if (currentMonth < eventMonth) {
    return true;
  } else if (currentMonth === eventMonth) {
    if (currentDay <= eventDay) {
      return true;
    }
  } else {
    return false;
  }
};

var _default = handleCheckDate;
exports.default = _default;
},{"../Utilities/Utilities":"js/Utilities/Utilities.js"}],"js/Templates/EventTemplate.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var EventTemplate = {
  wrap: {
    type: 'div',
    content: '',
    appendTo: document.querySelector('.eventsCalendar__events'),
    attrs: {
      class: 'eventCalendar__event'
    },
    setEvent: {},
    addChild: {}
  },
  detailsWrap: {
    type: 'div',
    content: '',
    appendTo: '',
    attrs: {
      class: 'eventCalendar__event--data'
    },
    setEvent: {},
    addChild: {}
  },
  register: {
    type: 'a',
    content: 'Register',
    appendTo: '',
    attrs: {
      class: 'button button--primary eventsCalendar__button--register u-text--upperCase',
      href: '/investing.htm'
    },
    setEvent: {},
    addChild: {}
  },
  details: [{
    type: 'h3',
    content: '',
    appendTo: '',
    attrs: {
      class: 'u-textBold'
    },
    setEvent: {},
    addChild: {}
  }, {
    type: 'p',
    content: '',
    appendTo: '',
    attrs: {},
    setEvent: {},
    addChild: {}
  }, {
    type: 'p',
    content: '',
    appendTo: '',
    attrs: {},
    setEvent: {},
    addChild: {}
  }, {
    type: 'p',
    content: '',
    appendTo: '',
    attrs: {},
    setEvent: {},
    addChild: {}
  }]
};
var _default = EventTemplate;
exports.default = _default;
},{}],"js/Utilities/BuildElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* BuildElement */
var BuildElement =
/*#__PURE__*/
function () {
  function BuildElement(type, content, appendTo, attrs, setEvent, addChild) {
    _classCallCheck(this, BuildElement);

    this.type = type;
    this.content = content;
    this.appendTo = appendTo;
    this.attrs = attrs;
    this.setEvent = setEvent;
    this.addChild = addChild;
  }

  _createClass(BuildElement, [{
    key: "addEvents",
    value: function addEvents(element) {
      var ev = this.setEvent;
      element.addEventListener(ev.functionType, function () {
        ev.functionName(ev.args);
      });
    }
  }, {
    key: "append",
    value: function append(element) {
      this.appendTo.appendChild(element);
    }
  }, {
    key: "appendChild",
    value: function appendChild(parent) {
      this.addChild.forEach(function (child) {
        if (child.appendTo === "") {} //child.appendTo = parent;
        //elementFactory.init(child);

      });
    }
  }, {
    key: "build",
    value: function build() {
      var elementToBuild = _Utilities.default.setAttributes(document.createElement(this.type), this.attrs);

      elementToBuild.innerHTML = this.content;
      return elementToBuild;
    }
  }]);

  return BuildElement;
}();
/* ---------------------
Element Factory
----------------------*/


var elementFactory = {
  init: function init() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var toBuild = elementFactory.checkForObj(args);
    var newElement = elementFactory.buildElement(toBuild);
    return newElement;
  },
  checkForObj: function checkForObj(arg) {
    if (arg[0].hasOwnProperty("type")) {
      return arg[0];
    } else {
      var template = elementFactory.buildObjectTemplate(arg);
      return template;
    }
  },
  buildObjectTemplate: function buildObjectTemplate(argArray) {
    var template = {
      type: argArray[0],
      content: argArray[1],
      appendTo: argArray[2],
      attrs: argArray[3],
      setEvent: argArray[4],
      addChild: argArray[5]
    };
    return template;
  },
  buildElement: function buildElement(toBuild) {
    var elementToBuild = new BuildElement(toBuild.type, toBuild.content, toBuild.appendTo, toBuild.attrs, toBuild.setEvent, toBuild.addChild);
    var newElement = elementToBuild.build();

    if (!_Utilities.default.isEmptyObj(elementToBuild.setEvent)) {
      elementToBuild.addEvents(newElement);
    }

    if (!_Utilities.default.isEmptyObj(elementToBuild.addChild)) {
      elementToBuild.appendChild(newElement);
    }

    elementToBuild.append(newElement);
    return newElement;
  }
};
var _default = elementFactory;
exports.default = _default;
},{"./Utilities":"js/Utilities/Utilities.js"}],"js/Handlers/handleBuildEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handleCheckDate = _interopRequireDefault(require("./handleCheckDate"));

var _EventTemplate = _interopRequireDefault(require("../Templates/EventTemplate"));

var _BuildElement = _interopRequireDefault(require("../Utilities/BuildElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var populateEventTemplateDetails = function populateEventTemplateDetails(monthEvent) {
  var eventDetailsContent = _EventTemplate.default.details.map(function (detail, index) {
    detail.content = monthEvent[index];
    return detail;
  });

  return eventDetailsContent;
};

var builder = function builder(toBuild, appendTo) {
  if (toBuild.length) {
    toBuild.forEach(function (build) {
      build.appendTo = appendTo;
      return _BuildElement.default.init(build);
    });
  } else {
    toBuild.appendTo = appendTo;
    return _BuildElement.default.init(toBuild);
  }
};

var handleBuildEvent = function handleBuildEvent(monthEvent) {
  builder(populateEventTemplateDetails(Object.keys(monthEvent).map(function (e) {
    return monthEvent[e];
  })), builder(_EventTemplate.default.detailsWrap, builder(_EventTemplate.default.wrap, document.querySelector(".eventsCalendar__events"))));

  if (monthEvent.register !== "") {
    if ((0, _handleCheckDate.default)(monthEvent.date.split(" "))) {
      _EventTemplate.default.register.attrs.href = monthEvent.register;
      builder(_EventTemplate.default.register, _EventTemplate.default.detailsWrap.appendTo);
    }
  }
};

var _default = handleBuildEvent;
exports.default = _default;
},{"./handleCheckDate":"js/Handlers/handleCheckDate.js","../Templates/EventTemplate":"js/Templates/EventTemplate.js","../Utilities/BuildElement":"js/Utilities/BuildElement.js"}],"js/Templates/ErrorMessage.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var ErrorMessage = {
  type: 'p',
  content: 'There are no events listed for this month',
  appendTo: '',
  attrs: {
    class: 'eventCalendar__error--message eventsCalendar__monthName'
  },
  setEvent: {},
  addChild: {}
};
var _default = ErrorMessage;
exports.default = _default;
},{}],"js/Handlers/handleBuildError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventTemplate = _interopRequireDefault(require("../Templates/EventTemplate"));

var _BuildElement = _interopRequireDefault(require("../Utilities/BuildElement"));

var _ErrorMessage = _interopRequireDefault(require("../Templates/ErrorMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleBuildError = function handleBuildError() {
  var wrap = _BuildElement.default.init(_EventTemplate.default.wrap);

  _ErrorMessage.default.appendTo = wrap;

  _BuildElement.default.init(_ErrorMessage.default);
};

var _default = handleBuildError;
exports.default = _default;
},{"../Templates/EventTemplate":"js/Templates/EventTemplate.js","../Utilities/BuildElement":"js/Utilities/BuildElement.js","../Templates/ErrorMessage":"js/Templates/ErrorMessage.js"}],"js/Handlers/handleCalendar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("../Utilities/Utilities"));

var _EventsCalendar = _interopRequireDefault(require("../EventsCalendar"));

var _handleBuildEvent = _interopRequireDefault(require("./handleBuildEvent"));

var _handleBuildError = _interopRequireDefault(require("./handleBuildError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEvents = function getEvents(eventsToGet) {
  return eventsToGet || _Utilities.default.getFile();
};

var handleCalendar = function handleCalendar(eventsToGet) {
  fetch(eventsToGet || "".concat(_EventsCalendar.default.eventsFilePath).concat(_Utilities.default.getMonthName(), ".js")).then(function (data) {
    if (data.status != 200) {
      (0, _handleBuildError.default)();
    } else {
      data.json().then(function (data) {
        return data.forEach(function (monthEvent) {
          return (0, _handleBuildEvent.default)(monthEvent);
        });
      });
    }
  });
  return true;
};

var _default = handleCalendar; // ***** Fetch not supported in IE11: XMLHTttpRequest fallback:

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

exports.default = _default;
},{"../Utilities/Utilities":"js/Utilities/Utilities.js","../EventsCalendar":"js/EventsCalendar.js","./handleBuildEvent":"js/Handlers/handleBuildEvent.js","./handleBuildError":"js/Handlers/handleBuildError.js"}],"js/Handlers/handleDisableButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("../Utilities/Utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disableForwardNav = 11;
var disableBackwardNav = _Utilities.default.getMonth() - 2;

var checkForDisabled = function checkForDisabled(navButtons) {
  navButtons.forEach(function (navButton) {
    if (navButton.getAttribute("disabled")) {
      removeDisabled(navButton);
    }
  });
  return true;
};

var removeDisabled = function removeDisabled(navButton) {
  return navButton.removeAttribute("disabled");
};

var disableButton = function disableButton(element) {
  return element.setAttribute("disabled", "true");
};

var handleDisableButton = function handleDisableButton(element, navButtons, monthValue) {
  return checkForDisabled(navButtons) ? monthValue == disableForwardNav || monthValue == disableBackwardNav ? disableButton(element) : false : false;
};

var _default = handleDisableButton;
exports.default = _default;
},{"../Utilities/Utilities":"js/Utilities/Utilities.js"}],"js/Handlers/handleMonthNavigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("../Utilities/Utilities"));

var _EventsCalendar = _interopRequireDefault(require("../EventsCalendar"));

var _handleDomMonths = _interopRequireDefault(require("./handleDomMonths"));

var _handleCalendar = _interopRequireDefault(require("./handleCalendar"));

var _handleDisableButton = _interopRequireDefault(require("./handleDisableButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navButtons = _Utilities.default.toArray(document.querySelectorAll(".eventsCalendar__navigation"));

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var currentMonthValue = _Utilities.default.getMonth();

var updateMonthValue = function updateMonthValue(element, monthValue) {
  if (element.classList.contains("eventsCalendar__navigation--next")) {
    if (monthValue < 11) {
      monthValue++;
    }
  } else if (element.classList.contains("eventsCalendar__navigation--previous")) {
    if (monthValue > _Utilities.default.getMonth() - 2) {
      monthValue--;
    }
  }

  (0, _handleDisableButton.default)(element, navButtons, monthValue);
  return monthValue;
};

var handleEventsNavigation = function handleEventsNavigation(element) {
  currentMonthValue = updateMonthValue(element, currentMonthValue);

  var monthValueElements = _Utilities.default.toArray(document.querySelectorAll("[monthvalue]"));

  monthValueElements.forEach(function (monthValueElement) {
    monthValueElement.setAttribute("monthvalue", currentMonthValue);
  });
  (0, _handleDomMonths.default)(months[currentMonthValue]);
  document.querySelector(".eventsCalendar__events").innerHTML = "";
  (0, _handleCalendar.default)("".concat(_EventsCalendar.default.eventsFilePath).concat(months[currentMonthValue], ".js"));
};

var setMonthNavEvents = function setMonthNavEvents() {
  navButtons.forEach(function (navButton) {
    navButton.setAttribute("monthvalue", currentMonthValue);
    navButton.addEventListener("click", function () {
      handleEventsNavigation(this);
    });
  });
};

var _default = setMonthNavEvents;
exports.default = _default;
},{"../Utilities/Utilities":"js/Utilities/Utilities.js","../EventsCalendar":"js/EventsCalendar.js","./handleDomMonths":"js/Handlers/handleDomMonths.js","./handleCalendar":"js/Handlers/handleCalendar.js","./handleDisableButton":"js/Handlers/handleDisableButton.js"}],"js/EventsCalendar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Utilities = _interopRequireDefault(require("./Utilities/Utilities"));

var _handleDomMonths = _interopRequireDefault(require("./Handlers/handleDomMonths"));

var _handleCalendar = _interopRequireDefault(require("./Handlers/handleCalendar"));

var _handleMonthNavigation = _interopRequireDefault(require("./Handlers/handleMonthNavigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventsCalendar = {
  eventsFilePath: "/js/Calendar/",
  init: function init() {
    var calendar = document.querySelector(".eventsCalendar__section");

    if (_Utilities.default.testForElement(calendar)) {
      if ((0, _handleDomMonths.default)()) {
        if ((0, _handleCalendar.default)()) {
          (0, _handleMonthNavigation.default)();
        }
      }
    }
  }
};
var _default = EventsCalendar;
exports.default = _default;
},{"./Utilities/Utilities":"js/Utilities/Utilities.js","./Handlers/handleDomMonths":"js/Handlers/handleDomMonths.js","./Handlers/handleCalendar":"js/Handlers/handleCalendar.js","./Handlers/handleMonthNavigation":"js/Handlers/handleMonthNavigation.js"}],"js/App.js":[function(require,module,exports) {
"use strict";

require("../css/scss/style.scss");

var _EventsCalendar = _interopRequireDefault(require("./EventsCalendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import scss
_EventsCalendar.default.init();
},{"../css/scss/style.scss":"css/scss/style.scss","./EventsCalendar":"js/EventsCalendar.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59743" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/App.js"], null)
//# sourceMappingURL=/App.dc58c3d0.js.map