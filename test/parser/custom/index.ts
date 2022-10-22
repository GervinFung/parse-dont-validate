import { parseAsCustom } from '../../../src';
import parse from '../../../src/parser/class';

const testCustomParser = () =>
    describe('Custom parser', () => {
        it.each(['string', 1, {}])(
            'should be able to parse "%p" as custom value/type',
            (value) => {
                const message = 'boolean is a boolean';
                const predicate = (value: unknown) => {
                    const type = typeof value;
                    return (
                        type === 'object' ||
                        type === 'number' ||
                        type === 'string'
                    );
                };

                const parser = parse(value).asCustom<unknown>(predicate);

                expect(parser.elseThrow(message)).toBe(value);
                expect(
                    parseAsCustom({
                        value,
                        message,
                        predicate,
                        ifParsingFailThen: 'throw',
                    })
                ).toBe(value);

                expect(parser.elseGet(undefined)).toBe(value);
                expect(
                    parseAsCustom({
                        value,
                        predicate,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBe(value);

                expect(parser.elseLazyGet(() => undefined)).toBe(value);
                expect(
                    parseAsCustom({
                        value,
                        predicate,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBe(value);
            }
        );
        it.each(['1', {}, 1])(
            'should not be able to parse "%p" as custom value/type when the custom predicate is wrong',
            (value) => {
                const message = `${value} is a boolean`;
                const predicate = (value: any) => Array.isArray(value);
                const parser = parse(value).asCustom(predicate);

                expect(() => parser.elseThrow(message)).toThrowError(message);
                expect(() =>
                    parseAsCustom({
                        value,
                        message,
                        predicate,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(parser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsCustom({
                        value,
                        predicate,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();

                expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
                expect(
                    parseAsCustom({
                        value,
                        predicate,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testCustomParser;
