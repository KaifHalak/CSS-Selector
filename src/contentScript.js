'use strict';

// TODO: What if the body is streambale?
// TODO: Fetch inline styles
// TODO: Should I take into acct the stlying of other packages like bootstrap or tailwind?
// TODO: what about the styling applied to * and inherited?
// TODO: Fastest search algo. (or use array or object (obj vs map))
// TODO: Memory management and css parser?
// TODO: All css files: stylesheets (<link>, <style>) and inline styles
// TODO: is constantly adding  / removing event listener efficeint?
// TODO: look for styles for element specific, inherits, and *
// TODO: take into acct the browser support
// TODO: Copy HTML with styling in the style tag

import { ElementPicker } from 'pick-dom-element';

console.log('CONTENT SCRIPT RUNNING');

MessagesFromBackground();

const pickerStyle = { borderColor: '#0000ff' };

// True - Active, False - Inactive
let pickerStatus = true;

const picker = new ElementPicker({ style: pickerStyle });
StartPicker();

function HandleEscKeyPress(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    TogglePicker();
  }
}


function OnHoverElement(element) {
  // console.log(`Hover: ${element}`);
}

function OnClickElement(element) {
  console.log(element);
  console.log(GetAppliedComputedStyles(element))
  TogglePicker();
}

function StopPicker() {
  picker.stop();
  document.removeEventListener('keydown', HandleEscKeyPress);
  console.log('Picker Stopped');
}

function StartPicker() {
  document.addEventListener('keydown', HandleEscKeyPress);
  picker.start({
    onHover: OnHoverElement,
    onClick: OnClickElement,
  });
  console.log('Picker Started');
}

function TogglePicker() {
  pickerStatus ? StopPicker() : StartPicker();
  pickerStatus = !pickerStatus;
  console.log('Picker Toggled');
}

function MessagesFromBackground() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let messageType = message.type;

    if (messageType === 'CONTENT_SCRIPT_STATUS') {
      sendResponse({ status: 'active' });
      TogglePicker();
    }
  });
}

function GetAppliedComputedStyles(element, pseudo = '') {
  var styles = window.getComputedStyle(element, pseudo);

  var inlineStyles = element.getAttribute('style');
  var appliedStyles = {};

  for (var i = 0; i < styles.length; i++) {
    var key = styles[i];
    var value = styles.getPropertyValue(key);

    element.style.setProperty(key, 'unset');

    var unsetValue = styles.getPropertyValue(key);

    if (inlineStyles) element.setAttribute('style', inlineStyles);
    else element.removeAttribute('style');

    // When an attr is set to "unset", one of 2 things happen:
    // 1. The attribute value is changed to any inherited value
    // 2. If there is no inherited value, it is set to the default CSS value (this also depends case to case bcs some styles like font-size will remain the same)

    if (unsetValue !== value) appliedStyles[key] = value;
  }

  let allInlineStyles = {}

  if (inlineStyles){
    allInlineStyles = InlineTextToObject(element);
  }


  return {...appliedStyles, ...allInlineStyles};
}

function InlineTextToObject(element) {
  var inlineStyles = element.getAttribute('style');
  let splitStyles = inlineStyles.split(/[:;|]/).filter((value) => value ? value : '');
  
  let allInlineStyles = {}

  for (let i = 0; i < splitStyles.length; i += 2) {
    let attr = splitStyles[i].trim();
    let value = splitStyles[i + 1].trim();

    allInlineStyles[attr] = value
  }

  return allInlineStyles
}
