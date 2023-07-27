import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-modal-wrapper',
	templateUrl: './modal-wrapper.component.html',
	styleUrls: ['./modal-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWrapperComponent {}
