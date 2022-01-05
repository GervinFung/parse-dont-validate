import parseAsDesiredArray from '../../../src/structure/array/parseAsDesiredArray';
import parseAsReadonlyArray from '../../../src/structure/array/parseAsReadonlyArray';
import parseAsArray from '../../../src/structure/array/parseAsArray';
import parseAsString from '../../../src/primitive/parseAsString';
import parseAsNumber from '../../../src/primitive/numeric/parseAsNumber';
import parseAsObject from '../../../src/structure/object/parseAsObject';

describe('Test parse as desired number array', () => {
    test('parse as desired number array', () => {
        const parseArray = parseAsDesiredArray(
            [1, 2, 3, 4, 5],
            (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value'),
            true
        );
        expect(Array.isArray(parseArray.orElseGet(1))).toEqual(true);
        expect(
            parseArray.orElseGetNull().every((val) => typeof val === 'number')
        ).toEqual(true);
        expect(
            parseArray
                .orElseGetUndefined()
                .every((val) => typeof val === 'number')
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

describe('Test parse as desired object array', () => {
    test('parse as desired object array', () => {
        const parseArray = parseAsDesiredArray(
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
            ],
            (value: any) =>
                parseAsObject(value, (obj: any) => {
                    const arr = parseAsReadonlyArray(obj, (value: any) =>
                        parseAsObject(value, (obj: any) => ({
                            name: parseAsString(obj.name).orElseThrowDefault(
                                'name'
                            ),
                            age: parseAsNumber(obj.age).orElseThrowDefault(
                                'age'
                            ),
                        })).orElseThrowDefault('obj')
                    ).orElseGetNull();
                    return (
                        arr ?? {
                            name: parseAsString(obj.name).orElseThrowDefault(
                                'name'
                            ),
                            age: parseAsNumber(obj.age).orElseThrowDefault(
                                'age'
                            ),
                        }
                    );
                }).orElseThrowDefault('obj'),
            true
        );
        expect(Array.isArray(parseArray.orElseGet(1))).toEqual(true);
        expect(
            parseArray.orElseGetNull().every((val) => {
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
            parseArray.orElseGetNull().every((val) => {
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
            parseArray.orElseGetNull().every((val) => {
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
            parseArray.orElseGetNull().every((val) => {
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
        const parseArray = parseAsDesiredArray(
            1,
            (value: any) => {
                throw new Error(`${value} should not reach here`);
            },
            true
        );
        expect(parseArray.orElseGet(1)).toEqual(1);
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
            parseAsReadonlyArray(1, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetReadonlyEmptyArray()
        ).toEqual([]);
        expect(
            parseAsReadonlyArray([1, 2], (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetReadonlyEmptyArray().length
        ).toEqual(2);

        expect(
            parseAsArray(1, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetEmptyArray()
        ).toEqual([]);
        expect(
            parseAsArray([1, 2], (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetEmptyArray().length
        ).toEqual(2);
    });
});
