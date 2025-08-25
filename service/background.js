"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log('HappyPing extension installed');
});

browser.runtime.onStartup.addListener(() => {
  console.log('HappyPing extension started');
});


browser.tabs.beforeCreate.addListener((tab) => {
  console.log(`New tab created with ID: ${tab.id}`);

  browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['../scripts/content.js']
  }).then(() => {
    console.log('Content script injected into new tab');
  }).catch(err => {
    console.error('Error injecting content script:', err);
  });


  browser.tabs.sendMessage(
    tab.id, 
    { action: 'ping', data: 'Hello from background!' }
  ).then(response => {
    console.log('Response from content script:', response);
  }).catch(err => {
    console.error('Error sending message to content script:', err);
  });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log(`Tab ${tabId} updated with URL: ${changeInfo.url}`);
    // You can perform actions here based on the tab's URL change
  }
});