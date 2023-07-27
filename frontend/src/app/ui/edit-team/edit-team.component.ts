import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EditTeamData } from 'src/app/core/models/team.model';

@Component({
	selector: 'app-edit-team',
	templateUrl: './edit-team.component.html',
	styleUrls: ['./edit-team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTeamComponent implements OnInit {
	public teamForm!: FormGroup;
	@Input() public dataEditDialog!: EditTeamData;
	@Output() public submitEmit = new EventEmitter();

	constructor(private fb: FormBuilder) {}

	public get username(): FormControl<string> {
		return this.teamForm.controls['username'] as FormControl;
	}
	public get password(): FormControl<string> {
		return this.teamForm.controls['password'] as FormControl;
	}
	public ngOnInit(): void {
		this.teamForm = this.fb.group({
			email: [this.dataEditDialog.email],
			username: [this.dataEditDialog.username, Validators.required],
			password: [''],
			motto: [this.dataEditDialog.motto],
		});
	}

	public onSubmit() {
		this.submitEmit.emit(this.teamForm.value);
	}
}
