'use strict';

chrome.action.onClicked.addListener(async (tab) => {
  let isContentScriptInjected = await sendMessageToContentScript(tab.id, {
    type: 'CONTENT_SCRIPT_STATUS',
  });

  if (isContentScriptInjected && isContentScriptInjected.status === 'active') {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js'],
  });
});

function sendMessageToContentScript(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        resolve(null);
      } else {
        resolve(response);
      }
    });
  });
}