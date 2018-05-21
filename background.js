browser.runtime.onMessage.addListener(request => {
    browser.tabs.create({url: request.href})
});