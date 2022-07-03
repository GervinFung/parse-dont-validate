import { createDataStructureParser } from '../parser';
import { getPossibleSelfDefinedType, isEqual } from '../util';
import { freeze } from './util';

type Map<T> = (val: any, index?: number, arr?: ReadonlyArray<T>) => T;

const getActualType = (u: unknown) =>
    Array.isArray(u) ? 'array' : getPossibleSelfDefinedType(u);

const parseAsAnArray = <T, A extends ReadonlyArray<T> | Array<T>>(
    map: Map<T>,
    u: unknown,
    isImmutable: boolean
) => {
    const expectedType = 'array';
    return createDataStructureParser<A>({
        expectedType,
        actualType: getActualType(u),
        t: () => freeze(() => (u as Array<any>).map<T>(map) as A, isImmutable),
    });
};

const orElseGetEmptyArray = <T, A extends ReadonlyArray<T> | Array<T>>(
    map: Map<T>,
    u: unknown,
    isImmutable: boolean
) =>
    !isEqual(getActualType(u), 'array')
        ? ([].map<T>(map) as A)
        : freeze(() => (u as Array<any>).map<T>(map) as A, isImmutable);

const parseAsArray = <T>(u: unknown, map: Map<T>) => ({
    ...parseAsAnArray<T, Array<T>>(map, u, false),
    orElseGetEmptyArray: () => orElseGetEmptyArray<T, Array<T>>(map, u, false),
});

const parseAsReadonlyArray = <T>(u: unknown, map: Map<T>) => ({
    ...parseAsAnArray<T, ReadonlyArray<T>>(map, u, true),
    orElseGetReadonlyEmptyArray: () =>
        orElseGetEmptyArray<T, ReadonlyArray<T>>(map, u, true),
});

export { parseAsArray, parseAsReadonlyArray };
