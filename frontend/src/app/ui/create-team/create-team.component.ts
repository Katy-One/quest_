import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-team',
	templateUrl: './create-team.component.html',
	styleUrls: ['./create-team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTeamComponent implements OnInit {
	public teamForm!: FormGroup;

	@Output() public submitEmit = new EventEmitter();

	constructor(private fb: FormBuilder) {}

	public get username(): FormControl<string> {
		return this.teamForm.controls['username'] as FormControl;
	}
	public get password(): FormControl<string> {
		return this.teamForm.controls['password'] as FormControl;
	}
	public get email(): FormControl<string> {
		return this.teamForm.controls['email'] as FormControl;
	}
	public ngOnInit(): void {
		this.teamForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	public onSubmit() {
		if (this.teamForm.valid) {
			this.submitEmit.emit(this.teamForm.value);
		}
	}
}
