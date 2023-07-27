import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-create-game',
	templateUrl: './create-game.component.html',
	styleUrls: ['./create-game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameComponent implements OnInit {
	public gameForm!: FormGroup;

	@Output() public submitEmit = new EventEmitter();

	constructor(private fb: FormBuilder) {}
	public get name(): FormControl<string> {
		return this.gameForm.controls['name'] as FormControl;
	}
	public ngOnInit(): void {
		this.gameForm = this.fb.group({
			name: ['', Validators.required],
		});
	}

	public onSubmit() {
		if (this.gameForm.valid) {
			this.submitEmit.emit(this.gameForm.value.name);
		}
	}
}
