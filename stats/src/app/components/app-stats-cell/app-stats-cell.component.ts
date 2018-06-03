import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

export enum NormStates {
  done,
  higher,
  lower
}

@Component({
  selector: 'app-stats-cell',
  templateUrl: './app-stats-cell.component.html',
  styleUrls: ['./app-stats-cell.component.scss']
})
export class AppStatsCellComponent implements OnInit {
  @Input() set value(value: number) {
    value = parseInt(`${value}`, 10);
    this._value = value ? value : 0;
  }

  get value(): number {
    return this._value;
  }

  @Input() set norm(value: number) {
    value = parseInt(`${value}`, 10);
    this._norm = value ? value : 0;
  }

  get norm(): number {
    return this._norm;
  }

  get differ(): number {
    return this.value - this.norm;
  }

  get hasThousands(): boolean {
    return `${this._value}`.length >= 4;
  }

  get state(): NormStates {
    let state;

    if (this.differ == 0 || !this.norm) {
      state = NormStates.done;
    } else if (this.differ > 0) {
      state = NormStates.higher;
    } else {
      state = NormStates.lower;
    }

    return state;
  }

  hover: boolean = false;

  private _value: number = 0;
  private _norm: number = 0;

  readonly normStates = NormStates;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }

  changeHover(value: boolean) {
    setTimeout(() => {
      this.hover = value;
      this.changeDetector.detectChanges();
    }, 0);
  }
}
