import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppStatsService, StatsModel } from "../../services/app-stats.service";

@Component({
	selector: 'app-stats',
	templateUrl: './app-stats.component.html',
	styleUrls: ['./app-stats.component.scss']
})
export class AppStatsComponent implements OnInit {
	stats: StatsModel[];

	constructor(private statsService: AppStatsService,
	            private cd: ChangeDetectorRef) {

	}

	ngOnInit() {
		this.statsService.getStats().subscribe((stats: StatsModel[]) => {
			this.stats = stats;
			this.cd.detectChanges();
		});
	}

	getTotal(searchKey: string) {
		let count = 0;

		this.stats.forEach((stats: StatsModel) => {
			count += stats[searchKey];
		});

		return count;
	}
}
