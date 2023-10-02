document.querySelectorAll('[data-locale]').forEach(elem => {
    elem.innerText = chrome.i18n.getMessage(elem.dataset.locale)
});

document.getElementById("newwikibtn").addEventListener("click", (e) => {
    chrome.tabs.create({ url: "https://minecraft.wiki/" });
})