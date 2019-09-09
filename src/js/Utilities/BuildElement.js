"use strict";
import utilities from "/Utilities";

/* BuildElement */
class BuildElement {
  constructor(type, content, appendTo, attrs, setEvent, addChild) {
    this.type = type;
    this.content = content;
    this.appendTo = appendTo;
    this.attrs = attrs;
    this.setEvent = setEvent;
    this.addChild = addChild;
  }
  addEvents(element) {
    const ev = this.setEvent;
    element.addEventListener(ev.functionType, function() {
      ev.functionName(ev.args);
    });
  }
  append(element) {
    this.appendTo.appendChild(element);
  }
  appendChild(parent) {
    this.addChild.forEach(function(child) {
      if (child.appendTo === "") {
        //child.appendTo = parent;
      }
      //elementFactory.init(child);
    });
  }
  build() {
    const elementToBuild = utilities.setAttributes(
      document.createElement(this.type),
      this.attrs
    );
    elementToBuild.innerHTML = this.content;
    return elementToBuild;
  }
}

/* ---------------------
Element Factory
----------------------*/
const elementFactory = {
  init(...args) {
    const toBuild = elementFactory.checkForObj(args);
    const newElement = elementFactory.buildElement(toBuild);
    return newElement;
  },
  checkForObj(arg) {
    if (arg[0].hasOwnProperty("type")) {
      return arg[0];
    } else {
      const template = elementFactory.buildObjectTemplate(arg);
      return template;
    }
  },
  buildObjectTemplate(argArray) {
    const template = {
      type: argArray[0],
      content: argArray[1],
      appendTo: argArray[2],
      attrs: argArray[3],
      setEvent: argArray[4],
      addChild: argArray[5]
    };
    return template;
  },
  buildElement(toBuild) {
    const elementToBuild = new BuildElement(
      toBuild.type,
      toBuild.content,
      toBuild.appendTo,
      toBuild.attrs,
      toBuild.setEvent,
      toBuild.addChild
    );
    const newElement = elementToBuild.build();
    if (!utilities.isEmptyObj(elementToBuild.setEvent)) {
      elementToBuild.addEvents(newElement);
    }

    if (!utilities.isEmptyObj(elementToBuild.addChild)) {
      elementToBuild.appendChild(newElement);
    }
    elementToBuild.append(newElement);
    return newElement;
  }
};

export default elementFactory;
