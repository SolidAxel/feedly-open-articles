browser.runtime.onMessage.addListener(async request => {
    const settings = await browser.storage.local.get("foreground");
    browser.tabs.create({url: request.href, active: !!settings.foreground})
});