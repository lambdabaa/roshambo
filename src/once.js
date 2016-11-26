// @flow

function once(obj: EventTarget, eventType: string, listener: Function): void {
  obj.addEventListener(eventType, function handleEvent(event: Event): void {
    obj.removeEventListener(eventType, handleEvent);
    listener(event);
  });
}

module.exports = once;
