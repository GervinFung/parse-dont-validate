import {
    parseAsMutableObject,
    parseAsReadonlyObject,
    parseAsString,
} from '../../../src';
import parse from '../../../src/parser/class';

const testObjectParser = () =>
    describe('Object parser', () => {
        it.each([
            {
                x: 1234,
                name: 'string',
                value: 23,
                age: true,
            } as const,
            {
                x: 123,
                name: 'bonjour',
                value: null,
                age: false,
            } as const,
        ])(
            'should be able to parse object "%p" as it is really an object',
            (object) => {
                const parseObject = (object: any) => ({
                    x: parse(object.x)
                        .asNumber()
                        .elseThrow('x is not a number'),
                    name: parseAsString({
                        string: object.name,
                        ifParsingFailThen: 'throw',
                        message: 'name is not a string',
                    }),
                    value: parse(object.value)
                        .asNull()
                        .elseLazyGet(() =>
                            parse(object.value)
                                .asNumber()
                                .elseThrow('value is neiter null nor number')
                        ),
                    age: parse(object.age)
                        .asBoolean()
                        .elseThrow('age is not a boolean'),
                });

                const message = 'object is a object';
                const mutableParser =
                    parse(object).asMutableObject(parseObject);
                const readonlyParser =
                    parse(object).asReadonlyObject(parseObject);

                expect(mutableParser.elseThrow(message)).toStrictEqual(object);
                expect(readonlyParser.elseThrow(message)).toStrictEqual(object);
                expect(
                    parseAsMutableObject({
                        object,
                        message,
                        parse: parseObject,
                        ifParsingFailThen: 'throw',
                    })
                ).toStrictEqual(object);
                expect(
                    parseAsReadonlyObject({
                        object,
                        message,
                        parse: parseObject,
                        ifParsingFailThen: 'throw',
                    })
                ).toStrictEqual(object);

                expect(mutableParser.elseGet(undefined)).toStrictEqual(object);
                expect(readonlyParser.elseGet(undefined)).toStrictEqual(object);
                expect(
                    parseAsMutableObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toStrictEqual(object);
                expect(
                    parseAsReadonlyObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toStrictEqual(object);

                expect(
                    mutableParser.elseLazyGet(() => undefined)
                ).toStrictEqual(object);
                expect(
                    readonlyParser.elseLazyGet(() => undefined)
                ).toStrictEqual(object);
                expect(
                    parseAsMutableObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toStrictEqual(object);
                expect(
                    parseAsReadonlyObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toStrictEqual(object);
            }
        );
        it.each(['1', null, 1])(
            'should not be able to parse "%p" as it is not an object',
            (object) => {
                const parseObject = () => ({});

                const message = `${object} is a not an object`;
                const mutableParser =
                    parse(object).asMutableObject(parseObject);
                const readonlyParser =
                    parse(object).asReadonlyObject(parseObject);

                expect(() => mutableParser.elseThrow(message)).toThrowError(
                    message
                );
                expect(() => readonlyParser.elseThrow(message)).toThrowError(
                    message
                );
                expect(() =>
                    parseAsMutableObject({
                        object,
                        message,
                        parse: parseObject,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);
                expect(() =>
                    parseAsReadonlyObject({
                        object,
                        message,
                        parse: parseObject,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(mutableParser.elseGet(undefined)).toBeUndefined();
                expect(readonlyParser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsMutableObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();
                expect(
                    parseAsReadonlyObject({
                        object,
                        parse: parseObject,
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
                    parseAsMutableObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
                expect(
                    parseAsReadonlyObject({
                        object,
                        parse: parseObject,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testObjectParser;
