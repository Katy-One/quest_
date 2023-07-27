import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

const easing = 'cubic-bezier(0.5, 0.5, 0.76, 0.76)';

export function menuAnimation() {
	return trigger('state', [
		// closed
		state(
			'false',
			style({
				display: 'none',
			}),
		),

		// opened
		state(
			'true',
			style({
				display: 'block',
			}),
		),

		// opening transition
		transition('false => true', [
			// select all items
			query('.item', [
				// set their pre-anim style
				style({
					opacity: 0,
					transform: 'translateX(10px)',
				}),
				// animated with 20ms stagger before each next item
				stagger('-20ms', [
					animate(
						`100ms ${easing}`,
						style({
							opacity: 1,
							transform: 'translateX(0)',
						}),
					),
				]),
			]),
		]),
		// closing transition
		transition('true => false', [
			// select all items
			query('.item', [
				// animated with 20ms stagger before each next item
				stagger('20ms', [
					animate(
						`100ms ${easing}`,
						style({
							opacity: 0,
							transform: 'translateX(10px)',
						}),
					),
				]),
			]),
		]),
	]);
}
