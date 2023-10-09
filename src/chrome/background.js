function getLocale(key) {
    return chrome.i18n.getMessage(key);
}

chrome.contextMenus.create({
    id: 'openwiki',
    title: getLocale("contextNewWiki"),
    contexts: ["page"]
});

chrome.contextMenus.create({
    id: 'usenewwiki',
    title: getLocale("contextOpenInNewWiki"),
    contexts: ['link'],
    targetUrlPatterns: [ "http://*.minecraft.fandom.com/*", "https://*.minecraft.fandom.com/*" ]
});

chrome.contextMenus.create({
    id: 'useoldwiki',
    title: getLocale("contextOpenInOldWiki"),
    contexts: ['link'],
    targetUrlPatterns: [ "http://*.minecraft.fandom.com/*", "https://*.minecraft.fandom.com/*" ]
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'useoldwiki' && info.linkUrl) {
        const linkUrl = new URL(info.linkUrl);

        await chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: [], disableRulesetIds: ["ruleset_1"], });
        chrome.tabs.create({ url: linkUrl.toString() });
        setTimeout(() => {
            chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ["ruleset_1"], });
        }, 10);
    }

    if (info.menuItemId === 'usenewwiki' && info.linkUrl) {
        const linkUrl = new URL(info.linkUrl);

        chrome.tabs.create({ url: linkUrl.toString() });
    }

    if (info.menuItemId === 'openwiki') chrome.tabs.create({ url: "https://minecraft.wiki" });
});