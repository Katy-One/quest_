import { TaskData } from './task.model';
import { TeamData } from './team.model';
export enum StatusEnumType {
	ACTIVE = 'active',
	DISABLE = 'disable',
}
export interface GameData extends GameEditData {
	id: string;
	gameName: string;
	finalMessage: string;
	isActive: boolean;
	author: string;
	status: StatusEnumType;
	users: TeamData[];
	tasks: TaskData[];
}

export interface GameEditData {
	gameName: string;
	finalMessage: string;
	author: string;
}
