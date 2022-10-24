import { parseAsMutableArray, parseAsReadonlyArray } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';
import { describe, it, expect } from 'vitest';

const testArrayParser = () =>
    describe('Array parser', () => {
        it.each(['string', 'number'] as const)(
            'should be able to parse "%s" array as it is really an array',
            (type) => {
                const array = turnToJsonData(
                    Array.from({ length: 5 }, (_, index) =>
                        type === 'number' ? index : `${index}`
                    )
                );

                const parseElement = (element: any) =>
                    parse(element)
                        .asNumber()
                        .elseLazyGet(() =>
                            parse(element)
                                .asString()
                                .elseThrow(
                                    'elemenet is neither string nor number'
                                )
                        );

                const message = 'object is a object';
                const mutableParser = parse(array).asMutableArray(parseElement);
                const readonlyParser =
                    parse(array).asReadonlyArray(parseElement);

                expect(mutableParser.elseThrow(message)).toStrictEqual(array);
                expect(readonlyParser.elseThrow(message)).toStrictEqual(array);
                expect(
                    parseAsMutableArray({
                        array,
                        message,
                        parseElement,
                        ifParsingFailThen: 'throw',
                    })
                ).toStrictEqual(array);
                expect(
                    parseAsReadonlyArray({
                        array,
                        message,
                        parseElement,
                        ifParsingFailThen: 'throw',
                    })
                ).toStrictEqual(array);

                expect(mutableParser.elseGet(undefined)).toStrictEqual(array);
                expect(readonlyParser.elseGet(undefined)).toStrictEqual(array);
                expect(
                    parseAsMutableArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toStrictEqual(array);
                expect(
                    parseAsReadonlyArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toStrictEqual(array);

                expect(
                    mutableParser.elseLazyGet(() => undefined)
                ).toStrictEqual(array);
                expect(
                    readonlyParser.elseLazyGet(() => undefined)
                ).toStrictEqual(array);
                expect(
                    parseAsMutableArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toStrictEqual(array);
                expect(
                    parseAsReadonlyArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toStrictEqual(array);
            }
        );

        it.each(['1', null, 1])(
            'should not be able to parse "%p" as it is not an array',
            (value) => {
                const array = turnToJsonData(value);
                const parseElement = () => ({});

                const message = `${array} is a not an array`;
                const mutableParser = parse(array).asMutableArray(parseElement);
                const readonlyParser =
                    parse(array).asReadonlyArray(parseElement);

                expect(() => mutableParser.elseThrow(message)).toThrowError(
                    message
                );
                expect(() => readonlyParser.elseThrow(message)).toThrowError(
                    message
                );
                expect(() =>
                    parseAsMutableArray({
                        array,
                        message,
                        parseElement,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);
                expect(() =>
                    parseAsReadonlyArray({
                        array,
                        message,
                        parseElement,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(mutableParser.elseGet(undefined)).toBeUndefined();
                expect(readonlyParser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsMutableArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();
                expect(
                    parseAsReadonlyArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();

                expect(
                    mutableParser.elseLazyGet(() => undefined)
                ).toBeUndefined();
                expect(
                    readonlyParser.elseLazyGet(() => undefined)
                ).toBeUndefined();
                expect(
                    parseAsMutableArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
                expect(
                    parseAsReadonlyArray({
                        array,
                        parseElement,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testArrayParser;
