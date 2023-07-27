import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { EditTaskData, TaskData } from 'src/app/core/models/task.model';

@Component({
	selector: 'app-create-edit-task',
	templateUrl: './create-edit-task.component.html',
	styleUrls: ['./create-edit-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditTaskComponent implements OnInit {
	public taskForm!: FormGroup;
	@Input() public taskData!: TaskData;
	@Output() public submitEmit = new EventEmitter<EditTaskData>();

	constructor(private fb: FormBuilder) {}
	public get answerFormat(): FormControl<string> {
		return this.taskForm.controls['answerFormat'] as FormControl;
	}
	public get description(): FormControl<string> {
		return this.taskForm.controls['description'] as FormControl;
	}
	public get correctAnswer(): FormControl<string> {
		return this.taskForm.controls['correctAnswer'] as FormControl;
	}

	public get order(): FormControl<string> {
		return this.taskForm.controls['answerFormat'] as FormControl;
	}
	public get taskName() {
		return this.taskForm.controls['taskName'] as FormArray;
	}
	public get hints() {
		return this.taskForm.controls['hints'] as FormArray;
	}

	public ngOnInit(): void {
		this.initForm();
	}
	public addHint() {
		const hintsForm = this.fb.group({
			hintDescription: ['', Validators.required],
			timeAppear: ['', Validators.required],
		});
		this.hints.push(hintsForm);
	}

	public deleteHint(hintIndex: number) {
		this.hints.removeAt(hintIndex);
	}
	public onSubmit() {
		if (this.taskForm.valid) {
			this.submitEmit.emit(this.taskForm.value);
		}
	}
	private initForm() {
		const hints = [];
		if (this.taskData.hints) {
			for (const hint of this.taskData.hints) {
				hints.push(
					new FormGroup({
						hintDescription: new FormControl(hint.hintDescription, Validators.required),
						timeAppear: new FormControl(hint.timeAppear),
					}),
				);
			}
			this.taskForm = this.fb.group({
				taskName: [this.taskData.taskName, Validators.required],
				answerFormat: [this.taskData.answerFormat, Validators.required],
				description: [this.taskData.description, Validators.required],
				correctAnswer: [this.taskData.correctAnswer, Validators.required],
				order: [this.taskData.order, Validators.required],
				hints: this.fb.array(hints),
			});
		}
	}
}
