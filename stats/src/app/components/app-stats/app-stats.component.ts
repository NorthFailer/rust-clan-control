import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppStatsService} from "../../services/app-stats.service";

export enum StatsStates {
  extractionNorm = 'extractionNorm',
  stats = 'stats'
}

@Component({
	selector: 'app-stats',
	templateUrl: './app-stats.component.html',
	styleUrls: ['./app-stats.component.scss']
})
export class AppStatsComponent implements OnInit {
	state: StatsStates = StatsStates.stats;

	readonly statsStates = StatsStates;

	constructor(private cd: ChangeDetectorRef,
              public statsService: AppStatsService) {

	}

	ngOnInit() {
	}

  setState(state: StatsStates) {
	  this.state = state;
	  this.cd.detectChanges();
  }

}
