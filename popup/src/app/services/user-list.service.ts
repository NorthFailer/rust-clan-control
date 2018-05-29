import { Injectable } from '@angular/core';
import { SteamAPIService, SteamUser } from "./steam-api.service";

@Injectable({
	providedIn: 'root'
})
export class UserListService {
	steamIds: string[] = [];
	steamUsers: SteamUser[] = [];

	constructor(private steamAPI: SteamAPIService) {
		this.initSteamIds();
	}

	add(steamUser: SteamUser) {
		this.steamIds.unshift(steamUser.steamid);
		this.steamUsers.unshift(steamUser);
		this.updateStorage();
	}

	has(steamId: string) {
		return this.steamIds.indexOf(steamId) > -1;
	}

	remove(steamUser: SteamUser) {
		const steamIdIndex = this.steamIds.indexOf(steamUser.steamid);
		const steamUserIndex = this.steamUsers.indexOf(steamUser);


		if (steamUserIndex > -1) {
			this.steamUsers.splice(steamUserIndex, 1);
		}

		if (steamIdIndex > -1) {
			this.steamIds.splice(steamIdIndex, 1);
			this.updateStorage();
		}
	}

	private initSteamIds() {
		const storageList = localStorage.getItem('steamIds');

		if (storageList) {
			this.steamIds = JSON.parse(storageList);

			if (this.steamIds.length) {
				this.updateSteamUsers();
			}
		}
	}

	private updateSteamUsers() {
		this.steamAPI.getUsers(this.steamIds).subscribe((steamUsers: SteamUser[]) => {
			this.steamUsers = steamUsers;
		});
	}

	private updateStorage() {
		localStorage.setItem('steamIds', JSON.stringify(this.steamIds));
	}
}
