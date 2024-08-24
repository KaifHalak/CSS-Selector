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

const CSS_MAP = await GetCSSMap();
// const CSS_MAP = [];

function OnHoverElement(element) {
  // console.log(`Hover: ${element}`);
}

function OnClickElement(element) {
  console.log(element);

  // let allSelectors = [];

  // // Adding a "." to each class
  // let allClasses = element.className
  //   .split(' ')
  //   .filter((eachClass) => eachClass !== '')
  //   .map((eachClass) => '.' + eachClass);
  // // .join('');

  // let allIds = element.id
  //   .split(' ')
  //   .filter((eachId) => eachId !== '')
  //   .map((eachId) => '#' + eachId);
  // // .join('');

  // allSelectors.push(...allClasses);
  // allSelectors.push(...allIds);
  // console.log('=================== \n');
  // console.log(CSS_MAP);

  TogglePicker();
  let allStyles = findStylesForElement(element);
  console.log(allStyles);
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

async function GetCSSMap() {
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  let allURLsList = Array.from(linkElements).map(
    (linkElement) => linkElement.href
  );

  const serverURL = 'http://localhost:3000/';
  let response = await fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indicate that the payload is JSON
    },
    body: JSON.stringify(allURLsList),
  });
  const cssMap = await response.json();

  console.log('==== CSS MAP Loaded ====');

  return cssMap;
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

function GetFullSelectorChain(element) {
  let currentElement = element;
  let selectorChain = '';
  let tagName = '';

  while (currentElement && tagName != 'body' && tagName != 'html') {
    // current element selectors
    let allClasses = currentElement.className
      .split(' ')
      .filter((eachClass) => eachClass !== '')
      .map((eachClass) => '.' + eachClass)
      .join('');

    let allIds = currentElement.id
      .split(' ')
      .filter((eachId) => eachId !== '')
      .map((eachId) => '#' + eachId)
      .join('');

    let currentElementSelectors = allIds + allClasses;

    selectorChain = currentElementSelectors + ' ' + selectorChain;

    currentElement = currentElement.parentElement;
    tagName = currentElement.tagName.toLowerCase();
  }
  console.log(selectorChain);
  return selectorChain;
}

function findStylesForElement(element) {
  const selectorChain = GetFullSelectorChain(element);
  let splitSelectorChain = selectorChain.split('.');
  const appliedStyles = [];

  let count = 0;

  CSS_MAP.forEach((styleObj) => {
    Object.keys(styleObj).forEach((selector) => {
      let splitClasses = selector.split('.');

      for (let i = 0; i < splitClasses.length; i++) {
        if (splitClasses[i] == splitSelectorChain[i]) {
          if (!appliedStyles.includes(styleObj[selector])) {
            appliedStyles.push(styleObj[selector]);
          }
        }
      }
    });
  });

  return appliedStyles;
}
