"use strict"

// TODO: Add error handling when fetching data from storage

// Menubar constants
const IS_HEX = true
const IS_REM = false
const DISPLAY_GRID_LINES = false

const IS_HTML = true
const IS_INCLUDE_CHILDREN = false

chrome.action.onClicked.addListener(async (tab) => {
  let isContentScriptInjected = await sendMessageToContentScript(tab.id, {
    type: "CONTENT_SCRIPT_STATUS",
  })

  if (isContentScriptInjected && isContentScriptInjected.status === "active") {
    return
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["assets/script.js"],
  })
})

chrome.runtime.onInstalled.addListener(OnInstalled)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const response = { success: true, message: "Data updated." }

  switch (message.type) {
    case "update-other":
      try {
        UpdateOptionsInStorage("other", message.data).then(() => {
          sendResponse(response)
        })
      } catch (error) {
        sendResponse({ success: false, message: error.message })
      }
      break

    case "update-copyHTML":
      try {
        UpdateOptionsInStorage("copyHTML", message.data).then(() => {
          sendResponse(response)
        })
      } catch (error) {
        sendResponse({ success: false, message: error.message })
      }
      break

    case "get-options":
      try {
        GetOptionsFromStorage().then((options) => {
          sendResponse({ success: true, data: options })
        })
      } catch (error) {
        sendResponse({ success: false, message: error.message })
      }
      break
  }

  return true
})

function sendMessageToContentScript(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(null)
      } else {
        resolve(response)
      }
    })
  })
}

async function OnInstalled({ reason }) {
  switch (reason) {
    case "install":
      chrome.storage.local.set({
        // menubar
        copyHTML: {
          isHTML: IS_HTML,
          isIncludeChildren: IS_INCLUDE_CHILDREN,
        },
        other: {
          isHex: IS_HEX,
          isREM: IS_REM,
          displayGridLines: DISPLAY_GRID_LINES,
        },
      })
      break
    case "update":
      break
    default:
      break
  }
}

async function UpdateOptionsInStorage(key, valueObject) {
  let options = await chrome.storage.sync.get(key)

  options[key] = {
    ...options[key],
    ...valueObject,
  }
  await chrome.storage.sync.set({ [key]: options[key] })

  return true
}

async function GetOptionsFromStorage() {
  let options = await chrome.storage.sync.get(null)
  return options
}
