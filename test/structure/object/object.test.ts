import parseAsDesiredObject from '../../../src/structure/object/parseAsDesiredObject';
import parseAsReadonlyArray from '../../../src/structure/array/parseAsReadonlyArray';
import parseAsString from '../../../src/primitive/parseAsString';
import parseAsBoolean from '../../../src/primitive/parseAsBoolean';
import parseAsNumber from '../../../src/primitive/parseAsNumber';

describe('Test parse as object positive case', () => {
    test.each([
        {
            value: [1, 2, 3, 4, 5, 6] as const,
            obj: [1, 2, 3, 4, 5, 6] as const,
            parse: (obj: any): any =>
                parseAsReadonlyArray(obj, (o) =>
                    parseAsNumber(o).orElseThrowDefault('o')
                ).orElseLazyGet(() => []),
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
                const x = parseAsNumber(obj.x)
                    .exactlyAs(123)
                    .orElseThrowDefault('x');
                const name = parseAsString(obj.name)
                    .exactlyAs('string')
                    .orElseThrowDefault('name');
                const age = parseAsBoolean(obj.age)
                    .exactlyAs(true)
                    .orElseThrowDefault('age');
                return {
                    x,
                    name,
                    age,
                };
            },
        },
    ])('data => %p', ({ value, obj, parse }) => {
        const parseObj = parseAsDesiredObject(value, parse, true);
        expect(parseObj.orElseGetNull()).toEqual(obj);
        expect(parseObj.orElseGetUndefined()).toEqual(obj);
        expect(parseObj.orElseGetEmptyObject()).toEqual(obj);
        expect(
            parseObj.orElseGet({
                name: 'Dont',
            })
        ).toEqual(obj);
        expect(
            parseObj.orElseLazyGet(() => ({
                name: 'Dont',
            }))
        ).toEqual(obj);
        expect(parseObj.orElseThrowDefault('value')).toEqual(obj);
        expect(parseObj.orElseThrowCustom('value')).toEqual(obj);
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
        const parseObj = parseAsDesiredObject(value, parse, true);
        expect(parseObj.orElseGetEmptyObject()).toEqual({});
        expect(parseObj.orElseGetUndefined()).toEqual(undefined);
        expect(parseObj.orElseGetNull()).toEqual(null);
        expect(
            parseObj.orElseGet({
                name: 'Dont',
            })
        ).toEqual({
            name: 'Dont',
        });
        expect(
            parseObj.orElseLazyGet(() => ({
                name: 'Dont',
            }))
        ).toEqual({
            name: 'Dont',
        });
        expect(() => parseObj.orElseThrowDefault('value')).toThrowError();
        expect(() => parseObj.orElseThrowCustom('value')).toThrowError();
    });
});

describe('Test parse as object with mismatch type case', () => {
    test.each([
        {
            value: {
                x: 123,
            } as const,
            parse: (obj: any) => {
                const x = parseAsNumber(obj.x)
                    .exactlyAs(431)
                    .orElseThrowDefault('x');
                return {
                    x,
                };
            },
        },
    ])('data => %p', ({ value, parse }) => {
        const parseObj = parseAsDesiredObject(value, parse, true);
        expect(() => parseObj.orElseGetEmptyObject()).toThrowError();
        expect(() => parseObj.orElseGetUndefined()).toThrowError();
        expect(() => parseObj.orElseGetNull()).toThrowError();
        expect(() =>
            parseObj.orElseGet({
                name: 'Dont',
            })
        ).toThrowError();
        expect(() =>
            parseObj.orElseLazyGet(() => ({
                name: 'Dont',
            }))
        ).toThrowError();
        expect(() => parseObj.orElseThrowDefault('value')).toThrowError();
        expect(() => parseObj.orElseThrowCustom('value')).toThrowError();
    });
});
