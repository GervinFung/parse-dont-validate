import {
    parseAsArray,
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from '../../../src';
import turnToJsonData from '../util';

describe('Test parse as mutable number array', () => {
    test('parse as mutable number array', () => {
        const parseArray = parseAsArray(
            turnToJsonData([1, 2, 3, 4, 5]),
            (value) => parseAsNumber(value).orElseThrowDefault('value')
        );
        expect(Array.isArray(parseArray.orElseGet(1))).toEqual(true);
        expect(Array.isArray(parseArray.orElseGet(() => 1))).toEqual(true);
        expect(
            parseArray
                .orElseGetNull()
                ?.every((val) => typeof val === 'number') ?? false
        ).toEqual(true);
        expect(
            parseArray
                .orElseGetUndefined()
                ?.every((val) => typeof val === 'number') ?? false
        ).toEqual(true);
        expect(
            parseArray
                .orElseThrowDefault('arr')
                .every((val) => typeof val === 'number')
        ).toEqual(true);
        expect(
            parseArray
                .orElseThrowCustom('not possible')
                .every((val) => typeof val === 'number')
        ).toEqual(true);
    });
});

describe('Test parse as readonly object array', () => {
    test('parse as readonly object array', () => {
        const parseArray = parseAsReadonlyArray(
            turnToJsonData([
                {
                    name: 'Wendy',
                    age: 20,
                },
                {
                    name: 'Gervin',
                    age: 21,
                },
                {
                    name: 'Bool',
                    age: 19,
                },
                [
                    {
                        name: 'Wendy',
                        age: 20,
                    },
                    {
                        name: 'Gervin',
                        age: 21,
                    },
                    {
                        name: 'Bool',
                        age: 19,
                    },
                ],
            ]),
            (value) =>
                parseAsReadonlyObject(value, (obj) =>
                    parseAsReadonlyArray(obj, (obj) => ({
                        name: parseAsString(obj.name).orElseThrowDefault(
                            'name'
                        ),
                        age: parseAsNumber(obj.age).orElseThrowDefault('age'),
                    })).orElseLazyGet(() =>
                        parseAsReadonlyObject(value, (obj) => ({
                            name: parseAsString(obj.name).orElseThrowDefault(
                                'name'
                            ),
                            age: parseAsNumber(obj.age).orElseThrowDefault(
                                'age'
                            ),
                        })).orElseThrowDefault('obj')
                    )
                ).orElseThrowDefault('obj')
        );
        expect(Array.isArray(parseArray.orElseGet(1))).toEqual(true);
        expect(Array.isArray(parseArray.orElseGet(() => 1))).toEqual(true);
        expect(
            parseArray.orElseGetNull()?.every((val) => {
                if (Array.isArray(val)) {
                    return val.every(
                        ({ name, age }) =>
                            typeof name === 'string' && typeof age === 'number'
                    );
                }
                const { name, age } = val as {
                    name: string;
                    age: number;
                };
                return typeof name === 'string' && typeof age === 'number';
            }) ?? false
        ).toEqual(true);
        expect(
            parseArray.orElseGetUndefined()?.every((val) => {
                if (Array.isArray(val)) {
                    return val.every(
                        ({ name, age }) =>
                            typeof name === 'string' && typeof age === 'number'
                    );
                }
                const { name, age } = val as {
                    name: string;
                    age: number;
                };
                return typeof name === 'string' && typeof age === 'number';
            }) ?? false
        ).toEqual(true);
        expect(
            parseArray.orElseThrowDefault('val').every((val) => {
                if (Array.isArray(val)) {
                    return val.every(
                        ({ name, age }) =>
                            typeof name === 'string' && typeof age === 'number'
                    );
                }
                const { name, age } = val as {
                    name: string;
                    age: number;
                };
                return typeof name === 'string' && typeof age === 'number';
            })
        ).toEqual(true);
        expect(
            parseArray.orElseThrowCustom('impossible to throw').every((val) => {
                if (Array.isArray(val)) {
                    return val.every(
                        ({ name, age }) =>
                            typeof name === 'string' && typeof age === 'number'
                    );
                }
                const { name, age } = val as {
                    name: string;
                    age: number;
                };
                return typeof name === 'string' && typeof age === 'number';
            })
        ).toEqual(true);
    });
});

describe('Test parse as desired array negative case', () => {
    test('parse as desired array negative case', () => {
        const parseArray = parseAsArray(1, (value) => {
            throw new Error(`${value} should not reach here`);
        });
        expect(parseArray.orElseGet(1)).toEqual(1);
        expect(
            parseArray.orElseLazyGet(() => ({
                name: 'Yo',
                age: 1999,
            }))
        ).toEqual({
            name: 'Yo',
            age: 1999,
        });
        expect(parseArray.orElseGetNull()).toEqual(null);
        expect(parseArray.orElseGetUndefined()).toEqual(undefined);
        expect(() => parseArray.orElseThrowDefault('arr')).toThrowError();
        expect(() =>
            parseArray.orElseThrowCustom('not possible')
        ).toThrowError();
    });
});

describe('Test parse as mutable and readonly array both cases', () => {
    test('parse as mutable and readonly array both cases', () => {
        expect(
            parseAsReadonlyArray(1, (value) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetReadonlyEmptyArray()
        ).toEqual([]);
        expect(
            parseAsReadonlyArray([1, 2], (value) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetReadonlyEmptyArray().length
        ).toEqual(2);

        expect(
            parseAsArray(1, (value) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetEmptyArray()
        ).toEqual([]);
        expect(
            parseAsArray([1, 2], (value) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetEmptyArray().length
        ).toEqual(2);
    });
});
