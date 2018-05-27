import * as $ from 'jquery';

class Stats {
    private $table;
    private $firstRow;
    private stats: Array<any>;

    constructor() {
        this.$table = $('#statsTable');
        this.$firstRow = $('#fixedRow');

        chrome.storage.local.get(['injector:stats'], (result) => {
            this.stats = result['injector:stats'];
            this.buildTable();
        });

        $(window).on('scroll', () => {
            this.$firstRow.css({top: $(window).scrollTop()});
        });
    }

    buildTable() {
        this.stats.forEach((userStats: any) => {
            this.$table.append(`<tr>
                <td><img class="stats-table__avatar" src="${userStats.steamData.avatarmedium}"></td>
                <td>${userStats.steamData.personaname}</td>
                <td>${(userStats.kills_player / userStats.deaths_player).toFixed(2)}</td>
                <td>${userStats.kills_player}</td>
                <td>${userStats.deaths_player}</td>
                <td>${userStats.kills_barrel}</td>
                <td>${userStats.harvests_sulfur_ore}</td>
                <td>${userStats.harvests_metal_ore}</td>
                <td>${userStats.harvests_stones}</td>
                <td>${userStats.harvests_wood}</td>
                <td>${userStats.harvests_leather}</td>
                <td>${userStats.harvests_cloth}</td>
                <td>${userStats.harvests_fat_animal}</td>
            </tr>`);
        });
    }
}

new Stats();