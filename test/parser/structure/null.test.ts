import { parseAsNull } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';
import { describe, it, expect } from 'vitest';

describe('Null parser', () => {
    it('should be able to parse null as it is really null', () => {
        const message = 'null is a null';
        const errorMessage = new Error(message);
        const value = turnToJsonData(null);
        const parser = parse(value).asNull();

        expect(parser.elseThrow(message)).toBeNull();
        expect(parser.elseThrow(errorMessage)).toBeNull();

        expect(
            parseAsNull({
                value,
                message,
                ifParsingFailThen: 'throw',
            })
        ).toBeNull();
        expect(
            parseAsNull({
                value,
                message: errorMessage,
                ifParsingFailThen: 'throw',
            })
        ).toBeNull();

        expect(parser.elseGet(undefined)).toBeNull();
        expect(
            parseAsNull({
                value,
                ifParsingFailThen: 'get',
                alternativeValue: undefined,
            })
        ).toBeNull();

        expect(parser.elseLazyGet(() => undefined)).toBeNull();
        expect(
            parseAsNull({
                value,
                ifParsingFailThen: 'lazy-get',
                alternativeValue: () => undefined,
            })
        ).toBeNull();
    });

    it.each(['1', {}, 1])(
        'should not be able to parse "%p" as it is not a null',
        (val) => {
            const value = turnToJsonData(val);
            const message = `${value} is a null`;
            const errorMessage = new Error(message);
            const parser = parse(value).asNull();

            expect(() => parser.elseThrow(message)).toThrowError(message);
            expect(() => parser.elseThrow(errorMessage)).toThrowError(message);

            expect(() =>
                parseAsNull({
                    value,
                    message,
                    ifParsingFailThen: 'throw',
                })
            ).toThrowError(message);
            expect(() =>
                parseAsNull({
                    value,
                    message: errorMessage,
                    ifParsingFailThen: 'throw',
                })
            ).toThrowError(errorMessage);

            expect(parser.elseGet(undefined)).toBeUndefined();
            expect(
                parseAsNull({
                    value,
                    ifParsingFailThen: 'get',
                    alternativeValue: undefined,
                })
            ).toBeUndefined();

            expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
            expect(
                parseAsNull({
                    value,
                    ifParsingFailThen: 'lazy-get',
                    alternativeValue: () => undefined,
                })
            ).toBeUndefined();
        }
    );
});
