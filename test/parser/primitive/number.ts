import { parseAsNumber } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';

const testNumberParser = () =>
    describe('Number parser', () => {
        it.each([1, 1000, 1000_000, 100_000_000])(
            'should be able to parse "%i" as it is really a number',
            (value) => {
                const number = turnToJsonData(value);
                const message = 'number is a number';
                const parser = parse(number).asNumber();

                expect(parser.elseThrow(message)).toBe(number);
                expect(
                    parseAsNumber({
                        number,
                        message,
                        ifParsingFailThen: 'throw',
                    })
                ).toBe(number);

                expect(parser.elseGet(undefined)).toBe(number);
                expect(
                    parseAsNumber({
                        number,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBe(number);

                expect(parser.elseLazyGet(() => undefined)).toBe(number);
                expect(
                    parseAsNumber({
                        number,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBe(number);

                const range = {
                    min: 1,
                    max: Number.MAX_SAFE_INTEGER,
                };
                expect(
                    parser.inRangeOf(range).elseLazyGet(() => undefined)
                ).toBe(number);
                expect(
                    parseAsNumber({
                        number,
                        inRangeOf: range,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBe(number);
            }
        );

        it.each(['1', {}, true])(
            'should not be able to parse "%p" as it is not a number',
            (value) => {
                const number = turnToJsonData(value);
                const message = `${number} is a number`;
                const parser = parse(number).asNumber();

                expect(() => parser.elseThrow(message)).toThrowError(message);
                expect(() =>
                    parseAsNumber({
                        number,
                        message,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(parser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsNumber({
                        number,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();

                expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
                expect(
                    parseAsNumber({
                        number,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();

                const range = {
                    min: 1,
                    max: Number.MAX_SAFE_INTEGER,
                };
                expect(
                    parser.inRangeOf(range).elseLazyGet(() => undefined)
                ).toBeUndefined();
                expect(
                    parseAsNumber({
                        number,
                        inRangeOf: range,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testNumberParser;
