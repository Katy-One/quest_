import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';

import { TeamData } from 'src/app/core/models/team.model';
import { AutocompleteService } from 'src/app/services/autocomplete.service';

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
	public form!: FormGroup;

	public filteredOptions!: Observable<TeamData[]>;

	@Output() public submitEmit = new EventEmitter();

	constructor(private autocompleteService: AutocompleteService, private fb: FormBuilder) {}

	public get teamName(): FormControl<string> {
		return this.form.controls['teamName'] as FormControl;
	}
	public ngOnInit() {
		this.form = this.fb.group({
			teamName: ['', [autocompleteObjectValidator(), Validators.required]],
		});
		this.filteredOptions = this.teamName.valueChanges.pipe(
			startWith(''),
			debounceTime(400),
			distinctUntilChanged(),
			switchMap(val => {
				return this.filterValue(val || '');
			}),
		);
	}

	public displayContactFn(team: TeamData): string {
		return team.username;
	}

	public onSubmit() {
		this.submitEmit.emit(this.teamName.value);
	}
	private filterValue(val: string | TeamData) {
		return this.autocompleteService.getData().pipe(
			map((response: TeamData[]) => {
				return response.filter((option: TeamData) => {
					if (typeof val === 'string') {
						return option.username.toLowerCase().indexOf(val.toLowerCase()) === 0;
					} else {
						return option.username.toLowerCase().indexOf(val.username.toLowerCase()) === 0;
					}
				});
			}),
		);
	}
}

function autocompleteObjectValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: { value: string } } | null => {
		if (typeof control.value === 'string') {
			return { invalidAutocompleteObject: { value: control.value } };
		}
		return null;
	};
}
