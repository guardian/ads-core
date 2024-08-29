import { log } from '@guardian/libs';
import type { AdSize, PageTargeting } from 'core';
import { findLineItems, type LineItem } from './line-items';

/**
 * LineItems have a priority from 1 to 16, with 1 being the highest priority.
 * This function will pick a line item from the list of line items to display using weighted random selection.
 * The higher the priority, the more likely the line item will be picked.
 * If a sponsorship level priority is present, the highest priority line item will be served.
 * @param lineItems
 */
const pickLineItem = (lineItems: LineItem[]) => {
	const randomMultiplier = lineItems.reduce(
		(acc, lineItem) => acc + 1 / lineItem.priority,
		0,
	);

	// Sort line items by priority, use 1/x as 1 is the highest priority
	const sortedLineItems = lineItems.sort(
		(a, b) => 1 / a.priority - 1 / b.priority,
	);

	const highestPriorityLineItem = sortedLineItems[-1];

	// Takeovers have a priority of 4 or less, so if the highest priority
	// line item has a priority of 4 or less, we should return that
	if (
		highestPriorityLineItem !== undefined &&
		highestPriorityLineItem.priority < 5
	) {
		return highestPriorityLineItem;
	}

	const randomNumber = Math.random() * randomMultiplier;

	let accumulator = 0;
	for (const lineItem of sortedLineItems) {
		accumulator += 1 / lineItem.priority;
		if (accumulator >= randomNumber) {
			return lineItem;
		}
	}
};

const findCreative = async (
	pageTargeting: PageTargeting,
	sizes: readonly AdSize[],
) => {
	// Toggle to debug in browser
	const debugCustomTargeting = true as true | false;

	const matchingLineItemsAndCreatives = (
		await findLineItems(pageTargeting, debugCustomTargeting)
	).filter((lineItem) => lineItem.creatives.length > 0);

	const slot = pageTargeting.slot as string;

	log(
		'commercial',
		`Found ${matchingLineItemsAndCreatives.length} line items for ${slot}`,
	);

	// console.log(
	// 	matchingLineItemsAndCreatives.map((x) => ({
	// 		id: x.id,
	// 		priority: x.priority,
	// 		name: x.name,
	// 	})),
	// );

	const lineItem = pickLineItem(matchingLineItemsAndCreatives);

	if (!lineItem) {
		log(
			'commercial',
			`No line items found for ${pageTargeting.slot as string}`,
		);
		return;
	}

	log(
		'commercial',
		`Selected line item ${lineItem.id} with priority ${lineItem.priority}`,
	);

	log('commercial', 'Selected line item', lineItem);

	const creatives = lineItem.creatives.filter((creative) => {
		return sizes.some((size) => {
			return (
				creative.size[0] === size.width &&
				creative.size[1] === size.height
			);
		});
	});

	// const creatives = matchingLineItemsAndCreatives
	// 	.map((lineItem) => lineItem.creatives)
	// 	.flat()
	// 	.filter((creative) => {
	// 		return sizes.some((size) => {
	// 			return (
	// 				creative.size.width === size.width &&
	// 				creative.size.height === size.height
	// 			);
	// 		});
	// 	});

	log(
		'commercial',
		`Found ${creatives.length} creatives for ${
			pageTargeting.slot as string
		}`,
	);

	const randomIndex = Math.floor(Math.random() * creatives.length);

	const creative = creatives[randomIndex];

	return creative;
};

const _ = { pickLineItem, findCreative };

export { _ };
export { findCreative };
