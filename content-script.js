async function shouldConfirmManyTabs() {
  const storage = await browser.storage.local.get('suppressConfirm');
  return !storage.suppressConfirm;
}

async function shouldMarkRead() {
  const storage = await browser.storage.local.get('markRead');
  return storage.markRead;
}

async function shouldOpenSaved() {
  const storage = await browser.storage.local.get('openSaved');
  return storage.openSaved;
}
async function open() {
  let unread;
  let saved;
  if (await shouldOpenSaved()) {
    saved = document.getElementsByClassName('EntryMetadataReadLater');
    console.log(saved)
  } else {
    unread = document.getElementsByClassName('entry u4');
  }


  if (await shouldOpenSaved()) {
    if (saved.length >= 5 && await shouldConfirmManyTabs() && !confirm(`Are you sure you want to open ${saved.length} tabs`)) {
      return;
    }
    for (const x of saved) {
      // noinspection ES6MissingAwait
      browser.runtime.sendMessage({
        href: x.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('a[class*="EntryTitleLink"]').href,
      });
    }
  } else {
    if (unread.length >= 5 && await shouldConfirmManyTabs() && !confirm(`Are you sure you want to open ${unread.length} tabs`)) {
      return;
    }
    for (var i = 0; i < unread.length; i++) {
      // Only if there is only single class
      if (unread[i].className == 'entry u4') {
        // Do something with the element e[i]
        browser.runtime.sendMessage({
          href: unread[i].querySelector('a[class*="EntryTitleLink"]').href,
        });
      }
    }
  }


  if (await shouldMarkRead()) {
    document.getElementsByClassName('MarkAsReadButton')[0].click();

    await new Promise((resolve) => requestAnimationFrame(resolve));

    document.querySelector('li.MenuItem:nth-child(2)').click();
  }
}
async function addButton(parent) {
  const button = document.createElement('button');
  button.style.borderRadius = '4px';
  button.style.paddingLeft = '11px';
  button.style.paddingRight = '11px';
  button.style.paddingBottom = '10px';
  button.style.paddingTop = '10px';
  button.style.fontWeight = '700';
  button.style.fontSize = '12px';
  button.style.color = '#FFFFFF';
  button.style.fontFamily = 'inherit';
  button.style.cursor = 'pointer';
  button.style.textAlign = 'center';
  button.style.minWidth = '50px';
  button.style.background = '#2bb24c';
  button.style.alignItems = 'center';
  button.style.display = 'inline-flex';
  button.style.textAlign = 'center';
  button.style.lineHeight = '1rem';
  button.style.marginRight = '10px';
  button.style.borderColor = '#2bb24c';
  button.style.borderStyle = 'solid';
  button.style.position = 'relative'
  button.classList.add('secondary', 'open-unread');

  if (await shouldOpenSaved()) {
    button.innerHTML = 'Open Saved';
  } else {
    button.innerHTML = 'Open Unread';
  }
  button.onclick = open;
  parent.insertBefore(button, parent.firstChild);
}

const observer = new MutationObserver(() => {
  const parent = document.getElementsByClassName('okOnNFlwXtGnQCE5o7BA');

  if (parent.length && !parent[0].querySelector('.open-unread')) {
    addButton(parent[0]);
  }
});

observer.observe(document.querySelector('body'), {
  childList: true,
  subtree: true,
});
