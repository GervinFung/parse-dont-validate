import {
    parseAsBoolean,
    parseAsNumber,
    parseAsObject,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from '../../src';
import turnToJsonData from './util';

const objectParserTest = () => {
    describe('Test parse as object positive case', () => {
        test.each([
            {
                value: [1, 2, 3, 4, 5, 6] as const,
                obj: [1, 2, 3, 4, 5, 6] as const,
                parse: (obj: any): any =>
                    parseAsReadonlyArray(obj, (o) =>
                        parseAsNumber(o).elseThrow('o')
                    ).elseGet([]),
            },
            {
                value: {
                    x: 123,
                    name: 'string',
                    age: true,
                } as const,
                obj: {
                    x: 123,
                    name: 'string',
                    age: true,
                } as const,
                parse: (obj: any): any => {
                    const x = parseAsNumber(obj.x).elseThrow('x');
                    const name = parseAsString(obj.name).elseThrow('name');
                    const age = parseAsBoolean(obj.age).elseThrow('age');
                    return {
                        x,
                        name,
                        age,
                    };
                },
            },
        ])('data => %p', ({ value, obj, parse }) => {
            const parseObj = parseAsReadonlyObject(
                turnToJsonData(value),
                parse
            );
            expect(parseObj.elseGet(null)).toEqual(obj);
            expect(parseObj.elseThrow('value')).toEqual(obj);
        });
    });

    describe('Test parse as object negative case', () => {
        test.each([
            {
                value: '[1, 2, 3, 4, 5, 6]',
                parse: (obj: any) => {
                    throw new Error(
                        `should not reach here as value is not an object, it is ${obj}`
                    );
                },
            },
            {
                value: 123123,
                parse: (obj: any) => {
                    throw new Error(
                        `should not reach here as value is not an object, it is ${obj}`
                    );
                },
            },
            {
                value: true,
                parse: (obj: any) => {
                    throw new Error(
                        `should not reach here as value is not an object, it is ${obj}`
                    );
                },
            },
        ])('data => %p', ({ value, parse }) => {
            const parseObj = parseAsObject(turnToJsonData(value), parse);
            expect(parseObj.elseGet(null)).toEqual(null);
            expect(parseObj.elseLazyGet(() => undefined)).toEqual(undefined);
            expect(() => parseObj.elseThrow('value')).toThrowError();
        });
    });

    describe('Test parse as object with mismatch type case', () => {
        test.each([
            {
                value: {
                    x: 123,
                } as const,
                parse: (obj: any) => ({
                    x: parseAsNumber(obj.x).inRangeOf(124, 1234).elseThrow('x'),
                }),
            },
        ])('data => %p', ({ value, parse }) => {
            const parseObj = parseAsObject(turnToJsonData(value), parse);
            expect(() => parseObj.elseGet(null)).toThrowError();
            expect(() => parseObj.elseThrow('value')).toThrowError();
        });
    });
};

export default objectParserTest;
