function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        foreground: document.querySelector("#foreground").checked,
        suppressConfirm: document.querySelector("#suppress-confirm").checked,
        markRead: document.querySelector("#mark-read").checked
    });
}

async function restoreOptions() {
    let storage = await browser.storage.local.get();
    document.querySelector("#foreground").checked = storage.foreground;
    document.querySelector("#suppress-confirm").checked = storage.suppressConfirm;
    document.querySelector("#mark-read").checked = storage.markRead;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);