const observer = new MutationObserver(() => {
    const siblings = document.getElementsByClassName('mark-as-read-button-group');

    for (let e of siblings) {
        const parent = e.parentElement;

        if (!parent.querySelector('.open-unread')) {
            addButton(parent);
        }
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

function open() {
    const unread = document.getElementsByClassName('unread');

    if (unread.length >= 5 && !confirm(`Are you sure you want to open ${unread.length} tabs`)) {
        return;
    }

    for (let x of unread) {
        browser.runtime.sendMessage({
            href: x.querySelector('a.title').href
        });
    }
}
