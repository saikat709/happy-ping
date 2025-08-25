const saveBtn = document.querySelector('input[type="checkbox"]');

browser.storage.local.get("showQuote").then((result) => {
    console.log("retrieved showQuote:", result );
    saveBtn.checked = result.showQuote;
}).catch(( error ) => {
    console.error("Error getting showQuote preference:", error);
    saveBtn.checked = true;
});

document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form data:", e );

    console.log("checkbox checked:", saveBtn.checked);
    browser.storage.local.set({ showQuote: saveBtn.checked });
    window.close();
});