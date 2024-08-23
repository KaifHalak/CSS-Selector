'use strict';

// TODO: What if the body is streambale?
// TODO: Fetch inline styles
// TODO: Should I take into acct the stlying of other packages like bootstrap or tailwind?
// TODO: what about the styling applied to * and inherited?
// TODO: Fastest search algo. (or use array or object (obj vs map))
// TODO: Memory management and css parser?
// TODO: All css files: stylesheets (<link>, <style>) and inline styles

import { ElementPicker } from 'pick-dom-element';

console.log('CONTENT SCRIPT RUNNING');

const CSS_MAP = GetCSSMap();

function OnHoverElement(element) {
  console.log(`Hover: ${element}`);
}

function OnClickElement(element) {
  picker.stop();
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

function main() {
  if (!CSS_MAP) {
    alert('Please Wait');
    return;
  }

  const style = { borderColor: '#0000ff' };
  const picker = new ElementPicker({ style });
  picker.start({
    onHover: OnHoverElement,
    onClick: OnClickElement,
  });
}

main();
