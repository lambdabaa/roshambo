"use strict";

function once(obj, eventType, listener) {
  obj.addEventListener(eventType, function handleEvent(event) {
    obj.removeEventListener(eventType, handleEvent);
    listener(event);
  });
}

module.exports = once;
