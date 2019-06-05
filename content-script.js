const observer = new MutationObserver(() => {
    const parent = document.getElementsByClassName('actions-container');

    if (parent.length && !parent[0].querySelector('.open-unread')) {
        addButton(parent[0]);
    }
});

function addButton(parent) {
    const button = document.createElement('button');
    button.classList.add('secondary', 'open-unread');
    button.innerHTML = 'Open unread';
    button.onclick = open;

    parent.insertBefore(button, parent.firstChild)
}


observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
});

async function shouldConfirmManyTabs() {
    const storage = await browser.storage.local.get("suppressConfirm");
    return !storage.suppressConfirm;
}

async function open() {
    const unread = document.getElementsByClassName('unread');

    if (unread.length >= 5 && await shouldConfirmManyTabs() && !confirm(`Are you sure you want to open ${unread.length} tabs`)) {
        return;
    }

    for (let x of unread) {
        browser.runtime.sendMessage({
            href: x.querySelector('a.title').href
        });
    }
}
