"use strict";

console.log('HappyPing content script loaded');


async function showPingNotification( message ) {
    console.log( `Ping received: ${message}` );
    await browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.runtime.getURL("icons/icon-48.png"),
        "title": "HappyPing Notification",
        "message": message
    });
}
