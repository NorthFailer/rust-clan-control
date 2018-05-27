import * as $ from 'jquery';

// $(function() {
//     const queryInfo = {
//       active: true,
//       currentWindow: true
//     };
//
//     chrome.tabs.query(queryInfo, function(tabs) {
//       $('#url').text(tabs[0].url);
//       $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
//     });
//
//     chrome.browserAction.setBadgeText({text: count.toString()});
//     $('#countUp').click(()=>{
//       chrome.browserAction.setBadgeText({text: (++count).toString()});
//     });
//
//     $('#changeBackground').click(()=>{
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {
//           color: '#555555'
//         },
//         function(msg) {
//           console.log("result message:", msg);
//         });
//       });
//     });
// });

class Popup {
    constructor() {
        SteamUserList.init();
    }
}

export interface SteamUser {
    avatar: string;
    personaname: string;
    profileurl: string;
    steamid: string;
}

namespace AddSteamIdButton {
    const $element = $('#addSteamId');
    let isLoading: boolean = false;

    addListeners();

    function addListeners() {
        $element.on('click', () => {
            const steamId: string = SteamIdInput.value() as string;

            if (steamId && !isLoading) {
                if (SteamUserList.has(steamId)) {
                    // TODO show error
                    console.error('Уже в списке');
                } else {
                    isLoading = true;

                    SteamAPI.getUser(steamId).then((user: SteamUser) => {
                        SteamUserList.add(user);
                        SteamIdInput.clear();
                        isLoading = false;
                        console.log(user);
                    }, (error) => {
                        // TODO show error
                        isLoading = false;
                        console.error(error);
                    });
                }
            }
        });
    }
}

namespace SteamIdInput {
    const $element = $('#steamId');

    export function value() {
        return $element.val();
    }

    export function clear() {
        $element.val('');
    }
}

namespace SteamUserList {
    export let list: string[] = [];
    export let userList: SteamUser[] = [];

    const $element = $('#userList');

    export function init() {
        const storageList = localStorage.getItem('userList');

        if (storageList) {
            list = JSON.parse(storageList);
            updateUserList();
        }
    }

    export function add(steamUser: SteamUser) {
        list.unshift(steamUser.steamid);
        userList.unshift(steamUser);
        updateStorage();
        drawUser(steamUser);
    }

    export function remove(steamId: string) {
        const userIndex = list.indexOf(steamId);

        userList = userList.filter((steamUser: SteamUser) => {
            return steamUser.steamid !== steamId;
        });

        if (userIndex > -1) {
            list.splice(userIndex, 1);
            updateStorage();
        }
    }

    export function has(steamId: string) {
        return list.indexOf(steamId) > -1;
    }

    function updateStorage() {
        localStorage.setItem('userList', JSON.stringify(list));
    }

    function updateUserList() {
        SteamAPI.getUsers(list).then((steamUsers: SteamUser[]) => {
            userList = steamUsers;
            drawUserList();
        });
    }

    function drawUserList() {
        $element.html('');

        userList.sort((a: SteamUser, b: SteamUser) => {
            if(a.personaname > b.personaname) return -1;
            if(a.personaname < b.personaname) return 1;
            return 0;
        }).forEach((steamUser: SteamUser) => {
            drawUser(steamUser);
        });
    }

    function drawUser(steamUser: SteamUser) {
        const $userListItem = $(`
            <div class="user-list__item">
                <a target="_blank" href="${steamUser.profileurl}">
                    <img class="user-list__avatar" src="${steamUser.avatar}">
                </a>
                <span class="user-list__username">${steamUser.personaname}</span>
            </div>`
        );

        const $removeButton = $(`
            <button class="input-group__icon" title="Удалить">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                <path d="M0 19h42v4H0z"/>
              </svg>
            </button>`
        );

        $removeButton.on('click', () => {
            remove(steamUser.steamid);
            $userListItem.remove();
        });

        $element.prepend($userListItem.append($removeButton));
    }
}

namespace SteamAPI {
    export function getUser(steamId: string) {
        return new Promise((resolve, reject) => {
            $.ajax('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',{
                method: 'GET',
                data: {
                    key: 'F4DD39F14EC3D21E05323B6939DF53D0',
                    format: 'json',
                    steamids: steamId
                },
                success: (data) => {
                    const player: SteamUser = data.response.players[0];
                    player ? resolve(player) : reject('SteamId не найден');
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    export function getUsers(steamIds: string[]) {
        return new Promise((resolve, reject) => {
            $.ajax('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',{
                method: 'GET',
                data: {
                    key: 'F4DD39F14EC3D21E05323B6939DF53D0',
                    format: 'json',
                    steamids: steamIds.join(';')
                },
                success: (data) => {
                    const players: SteamUser[] = data.response.players;
                    players.length ? resolve(players) : reject('SteamIds не найдены');
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
}

namespace StatsButton {
    const $element = $('#stats');

    addListeners();

    function addListeners() {
        $element.on('click', sendGetStatsEvent);
    }

    function sendGetStatsEvent() {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                msg: 'getStats',
                data: SteamUserList.userList
            });
        });
    }
}

new Popup();