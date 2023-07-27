import { trigger, state, style, animate, transition } from '@angular/animations';

const easing = 'cubic-bezier(0.5, 0.5, 0.76, 0.76)';

export function burgerLineAnimation(name: string, translateY = '9px', rotateFinal = '45deg', rotateOver = '65deg', width = '25px') {
	return trigger(name, [
		// opened state, in center, rotated, expanded
		state(
			'true',
			style({
				transform: `translateY(${translateY}) translateX(-2.5px) rotate(${rotateFinal})`,
				width: width,
			}),
		),

		// closed to open
		transition('false => true', [
			// move to center
			animate(
				`100ms ${easing}`,
				style({
					transform: `translateY(${translateY})`,
				}),
			),
			// expand from dot to line
			animate(
				`100ms ${easing}`,
				style({
					width: width,
					transform: `translateY(${translateY}) translateX(-2.5px)`,
				}),
			),
			// rotate over
			animate(
				`80ms ${easing}`,
				style({
					transform: `translateY(${translateY}) translateX(-2.5px) rotate(${rotateOver})`,
				}),
			),
			// rotate final
			animate(
				`150ms ${easing}`,
				style({
					transform: `translateY(${translateY}) translateX(-2.5px) rotate(${rotateFinal})`,
				}),
			),
		]),

		// open to closed
		transition('true => false', [
			// level and shrink
			animate(
				`100ms ${easing}`,
				style({
					transform: `translateY(${translateY}) translateX(0) rotate(0deg)`,
					width: '3px',
				}),
			),
			// move to proper position
			animate(
				`100ms ${easing}`,
				style({
					transform: 'translateY(0)',
				}),
			),
		]),
	]);
}
