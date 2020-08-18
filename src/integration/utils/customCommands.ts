/**
 * Special function to put in the browser set for iOS react pages. it sets the "input" event.
 * Appium has an issue that it doesn't send the event in the end.
 * This was found in https://github.com/appium/appium/issues/9002
 */
browser.addCommand(
  'setNativeValue',
  function(value) {
    browser.execute(
      function(element, value) {
        const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {};
        const prototype = Object.getPrototypeOf(element);
        const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {};
        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else if (valueSetter) {
          valueSetter.call(element, value);
        } else {
          throw new Error('The given element does not have a value setter');
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
      },
      this,
      value,
    );
  },
  true,
);
