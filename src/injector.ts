namespace Injector {
    injectJQuery().then(addListeners);

    function injectJQuery() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = '//code.jquery.com/jquery-latest.min.js';
            script.onload = () => {
                console.log('jQuery injected');
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    function addListeners() {
        document.addEventListener('getStats', (event: any) => {
            console.log('injector get custom event getStats', event.detail);
            getUsersStats(event.detail).then((data) => {
                document.dispatchEvent(new CustomEvent('injector:stats', {
                    detail: data
                }));
            });
        });
    }

    function getUserStats(steamId: string) {
        return new Promise((resolve, reject) => {
            $.ajax('https://furyclans.playrust.ru/api/index.php', {
                method: 'POST',
                data: {
                    modules: 'statistics',
                    action: 'getData',
                    serverID: 2653,
                    steamID: steamId
                },
                success: (data) => {
                    resolve(JSON.parse(data).data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    function getUsersStats(steamIds: string[]) {
        return Promise.all(steamIds.map((steamId: string) => {
            return getUserStats(steamId);
        }));
    }
}