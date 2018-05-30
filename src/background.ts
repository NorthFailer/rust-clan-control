class Background {
    constructor() {
        chrome.runtime.onMessage.addListener((request: any, sender, sendResponse) => {
            if (request.message === 'injector:stats') {
                chrome.storage.local.set({'injector:stats': request.data}, function() {
                    console.log('injector:stats Value is set to ', request.data);
                });
                chrome.tabs.create({ url: "stats/index.html" });
            }
        });
    }
}

new Background();