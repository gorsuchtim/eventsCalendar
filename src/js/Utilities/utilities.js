"use strict";
// this = !this
const utilities = {
  ariaToggle(element, attr) {
    return element.setAttribute(attr, element.getAttribute(attr) == "false");
  },
  class_add(element, ...classNames) {
    classNames.forEach(className => element.classList.add(className));
    return element;
  },
  class_remove(element, ...classNames) {
    classNames.forEach(className => element.classList.remove(className));
    return element;
  },
  getMonth() {
    var date = new Date();
    return date.getMonth();
  },
  getDate() {
    var date = new Date();
    return date.getDate();
  },
  getMonthName() {
    var date = new Date();
    return date.toLocaleString("en-us", { month: "long" });
  },
  getMonthFromString(month) {
    return new Date(Date.parse(month + " 1, 2012")).getMonth();
  },
  iOSTest() {
    var iDevices = [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
      "MacIntel"
    ];
    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()) {
          return true;
        }
      }
    }
    return false;
  },
  iOSSafariTest() {
    utilities.iOSTest() &&
    navigator.userAgent.toLowerCase().indexOf("chrome") == -1
      ? true
      : false;
  },
  isEmptyObj(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  },
  parseFile(fileName) {
    var parsedFile = JSON.parse(fileName);
    return parsedFile;
  },
  setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  },
  testForElement(element) {
    if (element !== null) {
      return true;
    }
  },
  toArray(list) {
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

export default utilities;
