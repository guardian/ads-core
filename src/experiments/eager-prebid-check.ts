import { memoize } from 'lodash-es';
import { getSynchronousTestsToRun } from './ab';
import { eagerPrebid } from './tests/eager-prebid';

/**
 * These functions can't be in the eager-prebid.ts file because there is a circular dependency
 */

export const getEagerPrebidVariant = memoize((): string | null => {
	const tests = getSynchronousTestsToRun();
	const test = tests.find((test) => test.id === eagerPrebid.id);
	return test ? test.variantToRun.id : null;
});
