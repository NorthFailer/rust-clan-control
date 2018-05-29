import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: 'app-input-field',
	templateUrl: './app-input-field.component.html',
	styleUrls: ['./app-input-field.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AppInputFieldComponent),
			multi: true
		}
	]
})
export class AppInputFieldComponent implements ControlValueAccessor {
	@Input() placeholder: string;
	@Input() type: string = 'text';
	@Input('value') _value: string;

	@Output() onSearch: EventEmitter<any> = new EventEmitter();

	onChange = (value) => {};
	onTouched = () => {};

	private disabled: boolean = false;
	private focused: boolean = false;

	get value(): any {
		return this._value;
	}

	set value(value: any) {
		this._value = value;
		this.onChange(value);
	}

	constructor() { }

	ngOnInit() {

	}

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(state: boolean): void {
		this.disabled = state;
	}

	onFocus(): void {
		if (!this.focused) {
			this.focused = true;
		}
	}

	onBlur(): void {
		this.focused = false;
		this.onTouched();
	}

}
