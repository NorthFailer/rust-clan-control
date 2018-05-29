import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { isArray } from "util";
import { Observable, Subject } from "rxjs/index";

export interface SteamUser {
	avatar: string;
	personaname: string;
	profileurl: string;
	steamid: string;
}

@Injectable({
	providedIn: 'root'
})
export class SteamAPIService {

	constructor(private http: HttpClient) { }

	getUsers(steamIds: string | string[]): Observable<SteamUser | SteamUser[]> {
		const subject = new Subject<SteamUser | SteamUser[]>();
		const arrayRequest: boolean = isArray(steamIds);

		this.http.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
			params: {
				key: 'F4DD39F14EC3D21E05323B6939DF53D0',
				format: 'json',
				steamids: arrayRequest ? (steamIds as Array<string>).join(';') : steamIds
			}
		}).subscribe((data: any) => {
			const { players } = data.response;
			subject.next(arrayRequest ? players : players[0]);
			subject.complete();
		}, subject.error.bind(subject));

		return subject;
	}
}
