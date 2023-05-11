import { parseAsBoolean } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';
import { describe, it, expect } from 'vitest';

describe('Boolean parser', () => {
    it.each([true, false])(
        'should be able to parse "%b" as it is really a boolean',
        (value) => {
            const boolean = turnToJsonData(value);
            const message = 'boolean is a boolean';
            const errorMessage = new TypeError('boolean is a boolean');
            const parser = parse(boolean).asBoolean();

            expect(parser.elseThrow(message)).toBe(boolean);
            expect(parser.elseThrow(errorMessage)).toBe(boolean);
            expect(
                parseAsBoolean({
                    boolean,
                    message,
                    ifParsingFailThen: 'throw',
                })
            ).toBe(boolean);
            expect(
                parseAsBoolean({
                    boolean,
                    message: errorMessage,
                    ifParsingFailThen: 'throw',
                })
            ).toBe(boolean);

            expect(parser.elseGet(undefined)).toBe(boolean);
            expect(
                parseAsBoolean({
                    boolean,
                    ifParsingFailThen: 'get',
                    alternativeValue: undefined,
                })
            ).toBe(boolean);

            expect(parser.elseLazyGet(() => undefined)).toBe(boolean);
            expect(
                parseAsBoolean({
                    boolean,
                    ifParsingFailThen: 'lazy-get',
                    alternativeValue: () => undefined,
                })
            ).toBe(boolean);
        }
    );

    it.each(['1', {}, 1])(
        'should not be able to parse "%p" as it is not a boolean',
        (value) => {
            const boolean = turnToJsonData(value);
            const message = `${boolean} is a boolean`;
            const errorMessage = new TypeError(message);
            const parser = parse(boolean).asBoolean();

            expect(() => parser.elseThrow(message)).toThrowError(message);
            expect(() => parser.elseThrow(errorMessage)).toThrowError(message);
            expect(() =>
                parseAsBoolean({
                    boolean,
                    message,
                    ifParsingFailThen: 'throw',
                })
            ).toThrowError(message);
            expect(() =>
                parseAsBoolean({
                    boolean,
                    message: errorMessage,
                    ifParsingFailThen: 'throw',
                })
            ).toThrowError(message);

            expect(parser.elseGet(undefined)).toBeUndefined();
            expect(
                parseAsBoolean({
                    boolean,
                    ifParsingFailThen: 'get',
                    alternativeValue: undefined,
                })
            ).toBeUndefined();

            expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
            expect(
                parseAsBoolean({
                    boolean,
                    ifParsingFailThen: 'lazy-get',
                    alternativeValue: () => undefined,
                })
            ).toBeUndefined();
        }
    );
});
