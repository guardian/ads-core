import type { AdFreeTargeting } from './ad-free';
import { getAdFreeTargeting } from './ad-free';
import type { ContentTargeting } from './content';
import { getContentTargeting } from './content';
import type { PersonalisedTargeting } from './personalised';
import { getPersonalisedTargeting } from './personalised';
import type { SessionTargeting } from './session';
import { getSessionTargeting } from './session';
import type { UnsureTargeting } from './unsure';
import type { ViewportTargeting } from './viewport';
import { getViewportTargeting } from './viewport';

type True = 't';
type False = 'f';
type NotApplicable = 'na';

type AdTargeting =
	| AdFreeTargeting
	| (UnsureTargeting &
			ContentTargeting &
			SessionTargeting &
			ViewportTargeting &
			PersonalisedTargeting);

/**
 * This adds little to using the type directly, but is left for consistency
 * TODO: reduce requirements for public API
 */
const getUnsureTargeting = (targeting: UnsureTargeting): UnsureTargeting =>
	targeting;

export {
	getAdFreeTargeting,
	getContentTargeting,
	getPersonalisedTargeting,
	getSessionTargeting,
	getUnsureTargeting,
	getViewportTargeting,
};
export type { AdTargeting, True, False, NotApplicable };
