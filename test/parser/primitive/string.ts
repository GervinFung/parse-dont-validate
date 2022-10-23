import { parseAsString } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';

const testStringParser = () =>
    describe('String parser', () => {
        it.each(['test', '1', 'content'])(
            'should be able to parse "`%s`" as it is really a string',
            (value) => {
                const string = turnToJsonData(value);
                const message = 'string is a string';
                const parser = parse(string).asString();

                expect(parser.elseThrow(message)).toBe(string);
                expect(
                    parseAsString({
                        string,
                        message,
                        ifParsingFailThen: 'throw',
                    })
                ).toBe(string);

                expect(parser.elseGet(undefined)).toBe(string);
                expect(
                    parseAsString({
                        string,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBe(string);

                expect(parser.elseLazyGet(() => undefined)).toBe(string);
                expect(
                    parseAsString({
                        string,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBe(string);

                const range = {
                    min: 1,
                    max: 7,
                };
                expect(
                    parser
                        .numberOfCharactersInRangeOf(range)
                        .elseLazyGet(() => undefined)
                ).toBe(string);
                expect(
                    parseAsString({
                        string,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                        numberOfCharactersInRangeOf: range,
                    })
                ).toBe(string);
            }
        );

        it.each([1, {}, true])(
            'should not be able to parse "%p" as it is not a string',
            (value) => {
                const string = turnToJsonData(value);
                const message = `${string} is a string`;
                const parser = parse(string).asString();

                expect(() => parser.elseThrow(message)).toThrowError(message);
                expect(() =>
                    parseAsString({
                        string: string,
                        message,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(parser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsString({
                        string: string,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();

                expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
                expect(
                    parseAsString({
                        string: string,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();

                const range = {
                    min: 18,
                    max: 18,
                };
                expect(
                    parser
                        .numberOfCharactersInRangeOf(range)
                        .elseLazyGet(() => undefined)
                ).toBeUndefined();
                expect(
                    parseAsString({
                        string: string,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                        numberOfCharactersInRangeOf: range,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testStringParser;
