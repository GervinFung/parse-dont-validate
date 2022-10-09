import {
    parseAsArray,
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from '../../src';
import turnToJsonData from './util';

const arrayParserTest = () => {
    describe('Test parse as mutable number array', () => {
        test('parse as mutable number array', () => {
            const parseArray = parseAsArray(
                turnToJsonData([1, 2, 3, 4, 5]),
                (value) => parseAsNumber(value).elseThrow('value')
            );
            expect(Array.isArray(parseArray.elseGet(1))).toEqual(true);
            expect(
                parseArray
                    .elseThrow('arr')
                    .every((val) => typeof val === 'number')
            ).toEqual(true);
            expect(
                parseArray
                    .elseThrow('not possible')
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
                        parseAsReadonlyArray(obj, (obj) =>
                            parseAsReadonlyObject(obj, (obj) => ({
                                name: parseAsString(obj.name).elseThrow('name'),
                                age: parseAsNumber(obj.age).elseThrow('age'),
                            })).elseThrow('obj')
                        ).elseLazyGet(() =>
                            parseAsReadonlyObject(value, (obj) => ({
                                name: parseAsString(obj.name).elseThrow(
                                    'hihi name'
                                ),
                                age: parseAsNumber(obj.age).elseThrow('age'),
                            })).elseThrow('obj')
                        )
                    ).elseThrow('obj')
            );
            expect(
                parseArray.elseThrow('val').every((val) => {
                    if (Array.isArray(val)) {
                        return val.every(
                            ({ name, age }) =>
                                typeof name === 'string' &&
                                typeof age === 'number'
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
                parseArray.elseThrow('impossible to throw').every((val) => {
                    if (Array.isArray(val)) {
                        return val.every(
                            ({ name, age }) =>
                                typeof name === 'string' &&
                                typeof age === 'number'
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
            expect(parseArray.elseGet(1)).toEqual(1);
            expect(() => parseArray.elseThrow('arr')).toThrowError();
            expect(() => parseArray.elseThrow('not possible')).toThrowError();
        });
    });

    describe('Test parse as mutable and readonly array both cases', () => {
        test('parse as mutable and readonly array both cases', () => {
            expect(
                parseAsReadonlyArray(1, (value) => {
                    throw new Error(`${value} should not reach here`);
                }).elseGet([])
            ).toEqual([]);
            expect(
                parseAsReadonlyArray([1, 2], (value) =>
                    parseAsNumber(value).elseThrow('value')
                ).elseGet([]).length
            ).toEqual(2);

            expect(
                parseAsArray(1, (value) => {
                    throw new Error(`${value} should not reach here`);
                }).elseGet([])
            ).toEqual([]);
            expect(
                parseAsArray([1, 2], (value) =>
                    parseAsNumber(value).elseThrow('value')
                ).elseGet([]).length
            ).toEqual(2);
        });
    });
};

export default arrayParserTest;
