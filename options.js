function saveOptions(e) {
    e.preventDefault();
    let value = document.querySelector("#foreground").checked;
    browser.storage.local.set({
        foreground: value
    });
}

async function restoreOptions() {
    let value = await browser.storage.local.get("foreground");
    document.querySelector("#foreground").checked = value.foreground;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);