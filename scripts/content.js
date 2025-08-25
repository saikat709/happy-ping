"use strict";

console.log('HappyPing content script loaded');


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if ( message.action === 'ping') {
    console.log('Ping received in content script', message.data);
    showPingNotification( message.data )
    .then( () => {
        sendResponse({ status: 'pong', data: 'Hello from content script!' })
    })
    .catch( err => {
        console.error('Error showing notification:', err)
        sendResponse({ status: 'error', error: err.message });
    });
    return true; 
  }
});


async function showPingNotification( message ) {
    console.log( `Ping received: ${message}` );
    await browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("icons/icon-48.png"),
        "title": "HappyPing Notification",
        "message": message
    });
}
