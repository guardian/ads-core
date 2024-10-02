import { reportError } from 'utils/report-error';
import { _, catchErrorsWithContext } from './robust';
import type { Modules } from './robust';

const { catchAndLogError } = _;

let origConsoleWarn: typeof window.console.warn;

beforeEach(() => {
	jest.clearAllMocks();
	origConsoleWarn = window.console.warn;
	window.console.warn = jest.fn();
});

afterEach(() => {
	window.console.warn = origConsoleWarn;
});

describe('robust', () => {
	const ERROR = new Error('Something broke.');
	const META = 'commercial';
	const TAGS = {
		module: 'test',
	};

	const noError = () => true;

	const throwError = () => {
		throw ERROR;
	};

	test('catchAndLogError()', () => {
		expect(() => {
			catchAndLogError('test', noError);
		}).not.toThrowError();

		expect(() => {
			catchAndLogError('test', throwError);
		}).not.toThrowError(ERROR);

		expect(window.console.warn).toHaveBeenCalledTimes(1);
	});

	test('catchAndLogError() - default reporter with no error', () => {
		catchAndLogError('test', noError);
		expect(reportError).not.toHaveBeenCalled();
	});

	test('catchAndLogError() - default reporter with error', () => {
		catchAndLogError('test', throwError);
		expect(reportError).toHaveBeenCalledWith(ERROR, META, TAGS);
	});

	test('catchErrorsWithContext()', () => {
		const runner = jest.fn();

		const MODULES = [
			['test-1', runner],
			['test-2', runner],
			['test-3', runner],
		] as Modules;

		catchErrorsWithContext(MODULES);
		expect(runner).toHaveBeenCalledTimes(MODULES.length);
	});
});
