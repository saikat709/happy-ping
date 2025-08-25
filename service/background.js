"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log('HappyPing extension installed');
});

browser.windows.onCreated.addListener((window) => {
  console.log(`New window created with ID: ${window.id}`); 
});

function displayText(text) {
  document.body.innerHTML = `<h1 style="text-align: center; margin-top: 50px;">${text}</h1>`;
  console.log(document.body.innerHTML);
}

browser.windows.onRemoved.addListener((windowId) => {
  console.log(`Window with ID: ${windowId} closed`);
});

browser.runtime.onStartup.addListener(() => {
  console.log('HappyPing extension started');
});

browser.tabs.onCreated.addListener((tab) => {
  console.log(`New tab created with ID: ${tab.id}, URL: ${tab.url}`);

  if ( tab.url && tab.url.trim() === "about:newtab" ) {
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: displayText,
      args: ["Hello, New Tab!"]
    })
    .catch(err => console.error('Script injection failed: ', err));
  }

  console.log("After injection");
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, _) => {
  console.log(`Tab ${tabId} updated: `, changeInfo);
});