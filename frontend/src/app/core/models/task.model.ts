export interface EditTaskData {
	taskName: string;
	answerFormat: string;
	description: string;
	correctAnswer: string;
	order: number;
	hints: HintData[];
}

interface HintData {
	hintDescription: string;
	timeAppear: string | Date;
}

export interface TaskData extends EditTaskData {
	id: string;
}
