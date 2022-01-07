import parseAsDesiredSet from '../../../src/structure/set/parseAsDesiredSet';
import parseAsReadonlySet from '../../../src/structure/set/parseAsReadonlySet';
import parseAsSet from '../../../src/structure/set/parseAsSet';
import parseAsString from '../../../src/primitive/parseAsString';
import parseAsNumber from '../../../src/primitive/numeric/parseAsNumber';
import parseAsObject from '../../../src/structure/object/parseAsObject';
import { isSet } from 'util/types';

describe('Test parse as desired number array', () => {
    test('parse as desired number array', () => {
        const parseSet = parseAsDesiredSet(
            new Set([1, 2, 3, 4, 5]),
            (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value'),
            true
        );
        expect(isSet(parseSet.orElseGet(1))).toEqual(true);
        expect(isSet(parseSet.orElseGet(() => 2))).toEqual(true);
        const set1 = parseSet.orElseGetNull() ?? new Set();
        expect(
            set1.size !== 0 &&
                Array.from(set1).every((val) => typeof val === 'number')
        ).toEqual(true);
        const set2 = parseSet.orElseGetUndefined() ?? new Set();
        expect(
            set2.size !== 0 &&
                Array.from(set1).every((val) => typeof val === 'number')
        ).toEqual(true);
        expect(
            Array.from(parseSet.orElseThrowDefault('arr')).every(
                (val) => typeof val === 'number'
            )
        ).toEqual(true);
        expect(
            Array.from(parseSet.orElseThrowCustom('not possible')).every(
                (val) => typeof val === 'number'
            )
        ).toEqual(true);
    });
});

describe('Test parse as desired object array', () => {
    test('parse as desired object array', () => {
        const parseSet = parseAsDesiredSet(
            new Set([
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
            ]),
            (value: any) =>
                parseAsObject(value, (obj: any) => ({
                    name: parseAsString(obj.name).orElseThrowDefault('name'),
                    age: parseAsNumber(obj.age).orElseThrowDefault('age'),
                })).orElseThrowDefault('obj'),
            true
        );
        expect(isSet(parseSet.orElseGet(1))).toEqual(true);
        expect(isSet(parseSet.orElseGet(() => 2))).toEqual(true);
        const set1 = parseSet.orElseGetNull() ?? new Set();
        expect(
            set1.size !== 0 &&
                Array.from(set1).every(
                    ({ name, age }) =>
                        typeof name === 'string' && typeof age === 'number'
                )
        ).toEqual(true);
        const set2 = parseSet.orElseGetUndefined() ?? new Set();
        expect(
            set2.size !== 0 &&
                Array.from(set1).every(
                    ({ name, age }) =>
                        typeof name === 'string' && typeof age === 'number'
                )
        ).toEqual(true);
        expect(
            Array.from(parseSet.orElseThrowDefault('arr')).every(
                ({ name, age }) =>
                    typeof name === 'string' && typeof age === 'number'
            )
        ).toEqual(true);
        expect(
            Array.from(parseSet.orElseThrowCustom('not possible')).every(
                ({ name, age }) =>
                    typeof name === 'string' && typeof age === 'number'
            )
        ).toEqual(true);
    });
});

describe('Test parse as desired set negative case', () => {
    test('parse as desired set negative case', () => {
        const parseSet = parseAsDesiredSet(
            1,
            (value: any) => {
                throw new Error(`${value} should not reach here`);
            },
            true
        );
        expect(parseSet.orElseGet(1)).toEqual(1);
        expect(
            parseSet.orElseLazyGet(() => ({
                itDefinitelyWorked: true,
                loaded: true,
            }))
        ).toEqual({
            itDefinitelyWorked: true,
            loaded: true,
        });
        expect(parseSet.orElseGetNull()).toEqual(null);
        expect(parseSet.orElseGetUndefined()).toEqual(undefined);
        expect(() => parseSet.orElseThrowDefault('arr')).toThrowError();
        expect(() => parseSet.orElseThrowCustom('not possible')).toThrowError();
    });
});

describe('Test parse as mutable and readonly set both cases', () => {
    test('parse as mutable and readonly set both cases', () => {
        expect(
            parseAsReadonlySet(1, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetReadonlyEmptySet()
        ).toEqual(new Set<unknown>());
        expect(
            parseAsReadonlySet(new Set([1, 2]), (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetReadonlyEmptySet().size
        ).toEqual(2);

        expect(
            parseAsSet(null, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetEmptySet()
        ).toEqual(new Set<unknown>());
        expect(
            parseAsSet(new Set([1, 2]), (value: unknown) =>
                parseAsNumber(value).orElseThrowDefault('value')
            ).orElseGetEmptySet().size
        ).toEqual(2);
    });
});
