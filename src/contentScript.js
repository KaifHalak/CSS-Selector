"use strict"
// https://github.com/hmarr/pick-dom-element/blob/main/package.json

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
// TODO: Clipboard does not work on http
// TODO: Sometimes styles which were not there before are added to the obj
// TODO: When copying HTML, add ability to include tw instead of css
// TODO: If you move the popup very fast, the cursor goes off
// TODO: The styles changes for the page when you inject the popup
// TODO: The selector causes a bobbing effect (not smooth)
// TODO: You should still be able to use inspect element when the picker is active
// TODO: Convert Px to rm and vice versa when copying html
// TODO: picker getting toggled multiple times when the popup is closed and opened
// TODO: Go through a chrome extension to see any best practices
// TODO: How to update without needing to go through chrome webstore checking

import { ElementPicker } from "pick-dom-element"
import FormatCSS from "./utils/logicalToTraditionalCSS.js"
import ConvertCSSToTw from "./utils/CSSToTW.js"
import ConvertHTMLToJSX from "./utils/HTMLToJSX.js"
import CopyToClipboard from "./utils/CopyToClipboard.js"

let UIdoc

const link = document.createElement("link")
link.rel = "stylesheet"
link.href = chrome.runtime.getURL("assets/styles.css")
document.head.appendChild(link)

const pickerStyle = { borderColor: "#0000ff", zIndex: "9999" }
const selectedElementOverlayStyle = { borderColor: "#741cd9", zIndex: "9999" }
// True - Active, False - Inactive
let pickerStatus = true
const picker = new ElementPicker(
  (overlayOptions = { style: pickerStyle }),
  (selectedOverlayOptions = { style: selectedElementOverlayStyle })
)

let elementData = {}
let globalUIFunctions = {}
// setStyleValues

export function main(UIFunctions) {
  console.log("CONTENT SCRIPT RUNNING")
  globalUIFunctions = UIFunctions

  UIdoc = globalUIFunctions.getUIDoc()

  StartPicker()
  MessagesFromBackground()
}

function HandleEscKeyPress(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    TogglePicker()
  }
}

function OnHoverElement(element) {}

async function OnClickElement(element) {
  // if (count !== 1) {
  //   count++
  //   StartPicker(element.parentElement)
  // }

  // element.style.backgroundColor = "gray"
  // element.style.border = "1px"
  // element.style.borderColor = "black"
  console.log(element)

  elementData.currentElement = element

  const cssStyles = GetAppliedComputedStyles(element)
  const formatCSSStyles = FormatCSS(cssStyles)

  // CopyHTML(element, formatStyling, false)
  // let jsx = ConvertHTMLToJSX(element, false)

  let tailwindStyles = await ConvertCSSToTw(formatCSSStyles)

  elementData.css = formatCSSStyles
  elementData.tw = tailwindStyles

  globalUIFunctions.setStyleValues({
    cssObject: formatCSSStyles,
    tw: tailwindStyles,
  })

  UIdoc.style.display = "block"
}

export function GetElementStyles() {
  return elementData
}

function StopPicker() {
  picker.stop()
  document.removeEventListener("keydown", HandleEscKeyPress)
  console.log("Picker Stopped")
}

function StartPicker() {
  document.addEventListener("keydown", HandleEscKeyPress)

  picker.start({
    onHover: OnHoverElement,
    onClick: OnClickElement,
    elementFilter: (element) => {
      if (
        element.closest("#css-selector-root-9524") ||
        element.closest(".menu-open")
      ) {
        return false
      }
      return true
    },
  })
  console.log("Picker Started")
}

function TogglePicker() {
  pickerStatus ? StopPicker() : StartPicker()
  pickerStatus
    ? (UIdoc.style.display = "none")
    : (UIdoc.style.display = "block")

  pickerStatus = !pickerStatus
  console.log("Picker Toggled")
}

function MessagesFromBackground() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let messageType = message.type

    if (messageType === "CONTENT_SCRIPT_STATUS") {
      sendResponse({ status: "active" })
      TogglePicker()
    }
  })
}

export function SendMessageToBackground(type, data = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type, data }, (response) => {
      console.log("Response from background script:", response)

      if (chrome.runtime.lastError) {
        // Handle any errors that occurred
        console.error("Error sending message:", chrome.runtime.lastError)
        reject(chrome.runtime.lastError)
      } else {
        // Resolve the promise with the response data
        if (response.data) {
          resolve(response.data)
        } else {
          resolve(response)
        }
      }
    })
  })
}

function GetAppliedComputedStyles(element, pseudo = "") {
  var styles = window.getComputedStyle(element, pseudo)

  var inlineStyles = element.getAttribute("style")
  var appliedStyles = {}

  for (var i = 0; i < styles.length; i++) {
    var styleKey = styles[i]
    var value = styles.getPropertyValue(styleKey)

    // Adding !important is impo as the value may not set to default if the existing value is !important for a style
    element.style.setProperty(styleKey, "unset", "important")

    var unsetValue = styles.getPropertyValue(styleKey)

    if (inlineStyles) element.setAttribute("style", inlineStyles)
    else element.removeAttribute("style")

    // When an attr is set to "unset", one of 2 things happen:
    // 1. The attribute value is changed to any inherited value
    // 2. If there is no inherited value, it is set to the default CSS value (this also depends case to case bcs some styles like font-size will remain the same)

    if (unsetValue !== value) appliedStyles[styleKey] = value
  }

  let allInlineStyles = {}

  if (inlineStyles) {
    allInlineStyles = InlineTextToObject(element)
  }

  return { ...appliedStyles, ...allInlineStyles }
}

function InlineTextToObject(element) {
  var inlineStyles = element.getAttribute("style")
  let splitStyles = inlineStyles
    .split(/[:;|]/)
    .filter((value) => (value ? value : ""))

  let allInlineStyles = {}

  for (let i = 0; i < splitStyles.length; i += 2) {
    let attr = splitStyles[i].trim()
    let value = splitStyles[i + 1].trim()

    allInlineStyles[attr] = value
  }
  return allInlineStyles
}

function CopyHTML(copyChildElements = false) {
  // Copy HTML

  let styling = elementData.css
  let originalElement = elementData.currentElement
  let elementCopy = originalElement.cloneNode(copyChildElements)

  let allStylings = Object.entries(styling)

  allStylings.forEach(([styleKey, value]) => {
    elementCopy.style[styleKey] = value
  })

  if (copyChildElements) {
    elementCopy = RecursivelyApplyStylesToAllChildElements(
      originalElement,
      elementCopy
    )[1]
  }

  return elementCopy
}

export function CopyElement(isHTML, copyChildElements = false) {
  let html = CopyHTML(copyChildElements)

  CopyToClipboard(isHTML.outerHTML ? html : ConvertHTMLToJSX(html))
}

function RecursivelyApplyStylesToAllChildElements(
  originalElement,
  elementCopy
) {
  if (!elementCopy.children) {
    return [originalElement, elementCopy]
  }

  for (
    let downTree = 0;
    downTree < Array.from(elementCopy.children).length - 1;
    downTree++
  ) {
    let originalChildElement = Array.from(originalElement.children)[downTree]
    let copyChildElement = Array.from(elementCopy.children)[downTree]

    let [downMostOriginalChildElement, downMostCopyChildElement] =
      RecursivelyApplyStylesToAllChildElements(
        originalChildElement,
        copyChildElement
      )

    let styling = GetAppliedComputedStyles(downMostOriginalChildElement)
    let formatStyling = FormatCSS(styling)

    let allStylings = Object.entries(formatStyling)

    allStylings.forEach(([styleKey, value]) => {
      downMostCopyChildElement.style[styleKey] = value
    })
  }

  return [originalElement, elementCopy]
}

export function GoUpSelector() {
  picker.goUpSelector(elementData.currentElement)
}

export function GoDownSelector() {
  picker.goDownSelector(elementData.currentElement)
}
