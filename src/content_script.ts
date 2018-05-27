import {SteamUser} from "./popup";

class ContentScript {
    private allScriptsAreInjected: boolean = false;
    steamUsers: SteamUser[] = [];

    constructor() {
        this.injectScript('js/injector.js').then(() => {
            this.allScriptsAreInjected = true;
            console.log('injection successfully done', this.allScriptsAreInjected);
        });
        this.subscribeToRuntimeEvents();
        this.subscribeToInjectorEvents();
    }

    private injectScript(scriptPath: string): Promise<any> {
        return new Promise<boolean>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = chrome.extension.getURL(scriptPath);
            (document.head||document.documentElement).appendChild(script);

            script.onload = () => {
                script.parentNode.removeChild(script);
                resolve();
            };

            script.onerror = () => {
                reject();
            };
        });
    }

    private eventsFactory(request: any, sender?, resolve?) {
        console.log('eventsFactory', request, sender);
        console.log('ContentScript dispatchEvent', request.msg);
        switch (request.msg) {
            case 'getStats':
                this.steamUsers = request.data;
                document.dispatchEvent(new CustomEvent(request.msg, {
                    'detail': request.data.map((steamUser: SteamUser) => {
                        return steamUser.steamid;
                    })
                }));
                break;
            case 'injector:stats':
                const mergedData = request.data.map((data: any) => {
                    data.steamData = this.steamUsers.find((steamUser: SteamUser) => {
                        return steamUser.steamid === data.steamID;
                    });

                    return data;
                });

                chrome.runtime.sendMessage({
                    message: 'injector:stats',
                    data: mergedData
                });
                break;
        }
    }

    private subscribeToRuntimeEvents() {
        chrome.runtime.onMessage.addListener(this.eventsFactory.bind(this));
    }

    private subscribeToInjectorEvents() {
        document.addEventListener('injector:stats', (event: any) => {
            this.eventsFactory({
                msg: 'injector:stats',
                data: event.detail,
            });
        });
    }
}

new ContentScript();