import parseAsDesiredMap from '../../../src/structure/map/parseAsDesiredMap';
import parseAsMap from '../../../src/structure/map/parseAsMap';
import parseAsReadonlyMap from '../../../src/structure/map/parseAsReadonlyMap';
import parseAsString from '../../../src/primitive/parseAsString';
import parseAsBoolean from '../../../src/primitive/parseAsBoolean';
import parseAsNumber from '../../../src/primitive/numeric/parseAsNumber';
import { isMap } from 'util/types';

describe('Test parse as desired key value number pair map', () => {
    test('parse as desired key value number pair map', () => {
        const parseMap = parseAsDesiredMap(
            new Map<number, number>()
                .set(1, 1)
                .set(2, 1)
                .set(3, 1)
                .set(4, 1)
                .set(5, 1)
                .set(6, 1),
            (value: unknown) => {
                if (Array.isArray(value)) {
                    const [k, v] = value;
                    return [
                        parseAsNumber(k).orElseThrowDefault('key'),
                        parseAsNumber(v).orElseThrowDefault('value'),
                    ];
                }
                throw new Error('entries must be key/value pair');
            },
            true
        );
        expect(isMap(parseMap.orElseGet(1))).toEqual(true);
        expect(
            Array.from(parseMap.orElseGetNull()).every(
                ([k, v]) => typeof k === 'number' && typeof v === 'number'
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseGetUndefined()).every(
                ([k, v]) => typeof k === 'number' && typeof v === 'number'
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseThrowDefault('arr')).every(
                ([k, v]) => typeof k === 'number' && typeof v === 'number'
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseThrowCustom('not possible')).every(
                ([k, v]) => typeof k === 'number' && typeof v === 'number'
            )
        ).toEqual(true);
    });
});

describe('Test parse as desired key(number) value(string | boolean) pair map', () => {
    test('parse as desired key(number) value(string | boolean) pair map', () => {
        const parseMap = parseAsDesiredMap(
            new Map<number, string | boolean>()
                .set(1, 'one')
                .set(2, 'two')
                .set(3, true)
                .set(4, false)
                .set(5, 'five')
                .set(6, 'six'),
            (value: unknown) => {
                if (Array.isArray(value)) {
                    const [k, v] = value;
                    return [
                        parseAsNumber(k).orElseThrowDefault('key'),
                        parseAsBoolean(v).orElseGetNull() ??
                            parseAsString(v).orElseThrowDefault('value'),
                    ];
                }
                throw new Error('entries must be key/value pair');
            },
            true
        );
        expect(isMap(parseMap.orElseGet(1))).toEqual(true);
        expect(
            Array.from(parseMap.orElseGetNull()).every(
                ([k, v]) =>
                    typeof k === 'number' &&
                    (typeof v === 'boolean' || typeof v === 'string')
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseGetUndefined()).every(
                ([k, v]) =>
                    typeof k === 'number' &&
                    (typeof v === 'boolean' || typeof v === 'string')
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseThrowDefault('arr')).every(
                ([k, v]) =>
                    typeof k === 'number' &&
                    (typeof v === 'boolean' || typeof v === 'string')
            )
        ).toEqual(true);
        expect(
            Array.from(parseMap.orElseThrowCustom('not possible')).every(
                ([k, v]) =>
                    typeof k === 'number' &&
                    (typeof v === 'boolean' || typeof v === 'string')
            )
        ).toEqual(true);
    });
});

describe('Test parse as desired map negative cases', () => {
    test('parse as desired map negative cases', () => {
        const parseMap = parseAsDesiredMap(
            1,
            (value: any) => {
                throw new Error(`${value} should not reach here`);
            },
            true
        );
        expect(parseMap.orElseGet(1)).toEqual(1);
        expect(parseMap.orElseGetNull()).toEqual(null);
        expect(parseMap.orElseGetUndefined()).toEqual(undefined);
        expect(() => parseMap.orElseThrowDefault('arr')).toThrowError();
        expect(() => parseMap.orElseThrowCustom('not possible')).toThrowError();
    });
});

describe('Test parse as mutable and readonlymap both cases', () => {
    test('parse as mutable and readonlymap both cases', () => {
        expect(
            parseAsReadonlyMap(1, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetReadonlyEmptyMap()
        ).toEqual(new Map<unknown, unknown>());
        expect(
            parseAsReadonlyMap(
                new Map<number, number>().set(1, 1).set(2, 1),
                (value: unknown) => {
                    if (Array.isArray(value)) {
                        const [k, v] = value;
                        return [
                            parseAsNumber(k).orElseThrowDefault('key'),
                            parseAsNumber(v).orElseThrowDefault('value'),
                        ];
                    }
                    throw new Error('entries must be key/value pair');
                }
            ).orElseGetReadonlyEmptyMap().size
        ).toEqual(2);

        expect(
            parseAsMap(1, (value: any) => {
                throw new Error(`${value} should not reach here`);
            }).orElseGetEmptyMap()
        ).toEqual(new Map<unknown, unknown>());
        expect(
            parseAsMap(
                new Map<number, number>().set(1, 1).set(2, 1),
                (value: unknown) => {
                    if (Array.isArray(value)) {
                        const [k, v] = value;
                        return [
                            parseAsNumber(k).orElseThrowDefault('key'),
                            parseAsNumber(v).orElseThrowDefault('value'),
                        ];
                    }
                    throw new Error('entries must be key/value pair');
                }
            ).orElseGetEmptyMap().size
        ).toEqual(2);
    });
});
