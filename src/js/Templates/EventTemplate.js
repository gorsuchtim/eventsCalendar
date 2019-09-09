'use strict'

const EventTemplate = {
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
  details: [
    {
      type: 'h3',
      content: '',
      appendTo: '',
      attrs: {
        class: 'u-textBold'
      },
      setEvent: {},
      addChild: {}
    },
    {
      type: 'p',
      content: '',
      appendTo: '',
      attrs: {},
      setEvent: {},
      addChild: {}
    },
    {
      type: 'p',
      content: '',
      appendTo: '',
      attrs: {},
      setEvent: {},
      addChild: {}
    },
    {
      type: 'p',
      content: '',
      appendTo: '',
      attrs: {},
      setEvent: {},
      addChild: {}
    }
  ]
}

export default EventTemplate