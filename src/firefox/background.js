function getLocale(key) {
    return browser.i18n.getMessage(key);
}

browser.contextMenus.create({
    id: 'openwiki',
    title: getLocale("contextNewWiki"),
    contexts: ["page"]
});

browser.contextMenus.create({
    id: 'usenewwiki',
    title: "" + getLocale("contextOpenInNewWiki"),
    contexts: ['link'],
});

browser.permissions.request({origins: ["*://minecraft.fandom.com/"]})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'useoldwiki' && info.linkUrl) {
        const linkUrl = new URL(info.linkUrl);

        await browser.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: [], disableRulesetIds: ["ruleset"], });
        browser.tabs.create({ url: linkUrl.toString() });
        setTimeout(() => {
            browser.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ["ruleset"], });
        }, 10);
    }

    if (info.menuItemId === 'usenewwiki' && info.linkUrl) {
        const linkUrl = new URL(info.linkUrl);

        browser.tabs.create({ url: linkUrl.toString() });
    }

    if (info.menuItemId === 'openwiki') browser.tabs.create({ url: "https://minecraft.wiki" });
});