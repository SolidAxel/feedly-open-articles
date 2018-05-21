const observer = new MutationObserver(() => {
    const buttons = document.querySelector('.actions-container');
    if (!buttons) return;

    if (buttons.querySelector('#open-unread')) return;

    const button = document.createElement('button');
    button.id = 'open-unread';
    button.classList.add('secondary');
    button.innerHTML = 'Open unread';
    button.onclick = open;
    buttons.insertBefore(button, buttons.firstChild)
});

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
