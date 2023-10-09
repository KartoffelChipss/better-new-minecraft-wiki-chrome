async function requestPerms() {
    const result = await browser.permissions.request({
        origins: [
            "*://minecraft.fandom.com/"
        ]
    });

    if (!result) {
        window.alert("Permission request was declined.\nPlease try again.");
    }
}